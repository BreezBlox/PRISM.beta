// PRISM.beta Service Worker
const CACHE_NAME = 'prism-cache-v1';
const OFFLINE_URL = './offline.html';

const INITIAL_CACHED_RESOURCES = [
  './',
  './index.html',
  './settings.html',
  './static/css/main.1059e796.css',
  './static/js/main.41ba4222.js',
  './static/js/department-manager.js',
  './static/js/department-selector.js',
  './favicon.svg',
  './logo192.svg',
  './logo512.svg',
  './manifest.json'
];

// Install event: caches resources
self.addEventListener('install', event => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(INITIAL_CACHED_RESOURCES)
          .catch(error => {
            console.warn(`Failed to cache resources: ${error.message}`);
            return Promise.resolve();
          });
      })
  );
});

// Fetch event: serve from cache first, then network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For HTML requests, try network first, then cache, then offline page
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
          console.error('Fetch error:', error);
          if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return new Response('Image not available offline', { 
              status: 503, 
              headers: { 'Content-Type': 'text/plain' } 
            });
          }
          return new Response('Network error', { 
            status: 503, 
            headers: { 'Content-Type': 'text/plain' } 
          });
        });
      }).catch(error => {
        console.error('Fetch error:', error);
      })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  console.log('Service worker activating...');
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});