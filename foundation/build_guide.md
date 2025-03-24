# Comprehensive Guidelines for Personal Website Development

## Core Architecture

1. **Responsive Design**: Implement a mobile-first approach with responsive breakpoints at 480px, 768px, 1024px, and 1440px.
2. **Performance Target**: Aim for <2s load time; optimize images and minimize JavaScript.
3. **Accessibility**: Follow WCAG 2.1 AA standards; ensure proper contrast, semantic HTML, and keyboard navigation.
4. **Recommended Stack for Beginners**:
    - HTML5, CSS3, vanilla JavaScript
    - Consider lightweight frameworks like 11ty or Astro for static site generation
    - Alternative: Simple React setup with Create React App or Next.js if familiar

## Page Structure & Content Guidelines

### Home Page

- Hero section with name, professional title, and brief tagline
- Visual preview sections linking to other site areas (art, projects, articles)
- Clear, accessible navigation
- Minimalist design that reflects personal aesthetic

### Art Page

- Responsive image gallery with lazy loading
- Filtering capability by medium/style/date
- Lightbox functionality for detailed viewing
- Brief context for each piece (title, medium, date, description)

### Medium Articles Page

- Integration options:
    - RSS feed integration
    - Medium API (developer token required)
    - Manual curation with article cards and links
- Preview of each article with title, date, excerpt, and featured image
- Reading time indicator

### Web Apps Showcase

- For each project:
    - Screenshot/demo preview
    - Title and concise description
    - Technologies used (badges/icons)
    - Live demo link and GitHub repository link
    - Development challenges and learning outcomes
- Consider progressive complexity display (simplest to most complex)

### About Me Page

- Professional bio (300-500 words)
- Skills visualization (progress bars or tag cloud)
- Education and experience timeline
- Personal interests/hobbies section
- High-quality professional photo

### Social Media & Contact

- Icon links to all platforms
- Consistent styling with hover effects
- Consider a simple contact form (Formspree for no-backend solution)
- Email address with spam protection (JavaScript obfuscation)

## Technical Implementation

### CSS Strategy

- CSS custom properties for theming (colors, typography, spacing)
- Consider utility-first approach with minimal framework (Tailwind CSS)
- Modular CSS architecture (BEM methodology)
- Dark/light mode toggle implementation

### JavaScript Considerations

- Minimize reliance on external libraries
- Implement progressive enhancement
- Use modern ES6+ features with fallbacks
- Component-based organization even in vanilla JS

### Assets Management

- Image optimization pipeline (WebP format with JPEG fallbacks)
- SVG for icons and simple illustrations
- Font loading optimization (system fonts or properly loaded web fonts)
- Proper caching strategy with versioning

## Development Process

1. **Planning**:
    - Create wireframes for all pages
    - Establish style guide (colors, typography, components)
    - Define content requirements for each section
2. **Environment**:
    - Version control with Git/GitHub
    - Simple build process (npm scripts)
    - Local development server
3. **Implementation Order**:
    - Global styles and navigation
    - Home page → About → Art → Projects → Articles
    - Global components (footer, contact)
    - Final polish and cross-browser testing

## SEO & Analytics

- Semantic HTML with proper heading hierarchy
- Descriptive meta tags and Open Graph data
- Simple sitemap.xml
- Google Analytics or Plausible for privacy-focused analytics
- Structured data for portfolio items

## Deployment & Maintenance

- Recommended hosting: Netlify, Vercel, or GitHub Pages
- Implement continuous deployment from repository
- Regular content updates schedule
- Backup strategy for content and code

## Security Considerations

- Implement CSP headers
- Use HTTPS (automatic with recommended hosting)
- Sanitize any user inputs (contact form)
- Keep dependencies updated