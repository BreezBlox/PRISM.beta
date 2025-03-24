<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DIGITAL ART | YOUR NAME</title>
<style>
/* Base Styles - Same as home page */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;700&display=swap');

```
    :root {
        --glitch-red: #ff1a1a;
        --glitch-blue: #00ccff;
        --glitch-green: #00ff66;
        --dark-bg: #0a0a0a;
        --text-color: #e6e6e6;
    }

    body, html {
        margin: 0;
        padding: 0;
        background-color: var(--dark-bg);
        color: var(--text-color);
        font-family: 'Roboto Mono', monospace;
        overflow-x: hidden;
        cursor: crosshair;
    }

    /* Effects from homepage - shortened for brevity */
    body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='<http://www.w3.org/2000/svg>'%3E%3Cdefs%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3CfeBlend mode='overlay' in='SourceGraphic' result='blend'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 2;
        opacity: 0.3;
        mix-blend-mode: overlay;
    }

    body::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
        );
        pointer-events: none;
        z-index: 3;
        opacity: 0.4;
        animation: scanlines 8s linear infinite;
    }

    /* VHS, CRT, and other effects - same as homepage */
    .vhs-effect, .crt-effect, .random-glitch {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .vhs-effect {
        background: linear-gradient(
            transparent 0%,
            rgba(255, 0, 0, 0.03) 10%,
            transparent 15%,
            rgba(0, 255, 255, 0.03) 40%,
            transparent 50%
        );
        z-index: 4;
        mix-blend-mode: hard-light;
    }

    .crt-effect {
        z-index: 5;
        background: radial-gradient(
            ellipse at center,
            rgba(100, 100, 100, 0.1) 0%,
            rgba(0, 0, 0, 0.2) 100%
        );
        mix-blend-mode: overlay;
    }

    .random-glitch {
        z-index: 6;
        opacity: 0;
    }

    /* Header & Navigation - Similar to homepage */
    header {
        padding: 20px;
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        position: relative;
        font-size: 40px;
        font-weight: bold;
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 2px;
        color: white;
        text-shadow: 3px 3px 0 var(--glitch-red), -2px -2px 0 var(--glitch-blue);
        margin-left: 20px;
    }

    nav {
        display: flex;
        padding: 10px 20px;
        background-color: rgba(0,0,0,0.8);
        position: relative;
        z-index: 10;
        border-top: 1px solid rgba(255,50,50,0.2);
        border-bottom: 1px solid rgba(255,50,50,0.2);
    }

    nav a {
        color: var(--text-color);
        text-decoration: none;
        margin: 0 15px;
        padding: 5px 10px;
        font-size: 16px;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        transition: all 0.3s;
        font-family: 'Bebas Neue', sans-serif;
    }

    nav a:hover {
        color: var(--glitch-red);
        text-shadow: 2px 2px 0 rgba(0,0,0,0.8), -1px -1px 0 var(--glitch-blue);
    }

    /* Digital Art Page Specific Styles */
    /* Hero Section */
    .hero {
        position: relative;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 40px;
        z-index: 10;
    }

    .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23222222'/%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='600' height='400' filter='url(%23noise)' opacity='0.15'/%3E%3Cg fill='none' stroke='%23ff3232' stroke-width='2' opacity='0.6'%3E%3Cpath d='M0,100 Q150,150 300,100 Q450,50 600,100' /%3E%3Cpath d='M0,200 Q150,250 300,200 Q450,150 600,200' /%3E%3Cpath d='M0,300 Q150,350 300,300 Q450,250 600,300' /%3E%3C/g%3E%3Cg fill='none' stroke='%233232ff' stroke-width='1' opacity='0.4'%3E%3Cpath d='M0,150 Q150,200 300,150 Q450,100 600,150' /%3E%3Cpath d='M0,250 Q150,300 300,250 Q450,200 600,250' /%3E%3Cpath d='M0,350 Q150,400 300,350 Q450,300 600,350' /%3E%3C/g%3E%3C/svg%3E") center/cover;
        opacity: 0.6;
        z-index: -1;
    }

    .hero-content {
        text-align: center;
        padding: 20px;
        max-width: 800px;
        position: relative;
    }

    .page-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 80px;
        letter-spacing: 5px;
        margin: 0 0 20px;
        position: relative;
        display: inline-block;
    }

    .page-title::before,
    .page-title::after {
        content: "DIGITAL ART";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .page-title::before {
        color: var(--glitch-red);
        z-index: -1;
        transform: translateX(-5px);
        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        animation: glitch-title 5s infinite;
    }

    .page-title::after {
        color: var(--glitch-blue);
        z-index: -2;
        transform: translateX(5px);
        clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        animation: glitch-title 5s infinite reverse;
    }

    @keyframes glitch-title {
        0%, 90%, 100% { transform: translate(0, 0); }
        92% { transform: translate(-5px, 3px); }
        94% { transform: translate(5px, -2px); }
        96% { transform: translate(-3px, 0); }
        98% { transform: translate(3px, 2px); }
    }

    .hero-description {
        font-size: 16px;
        line-height: 1.6;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        max-width: 600px;
        margin: 0 auto;
    }

    /* Filter Categories */
    .filter-categories {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 40px 0;
        padding: 0 20px;
        position: relative;
        z-index: 10;
    }

    .filter-button {
        background: none;
        border: 1px solid rgba(255,255,255,0.2);
        color: var(--text-color);
        padding: 8px 20px;
        margin: 5px;
        font-family: 'Roboto Mono', monospace;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
    }

    .filter-button:hover,
    .filter-button.active {
        color: white;
        border-color: var(--glitch-red);
        box-shadow: 0 0 15px rgba(255,0,0,0.3);
        transform: translateY(-2px) scale(1.05);
    }

    .filter-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,50,50,0.2), transparent);
        transition: left 0.3s;
        z-index: -1;
    }

    .filter-button:hover::before {
        left: 100%;
    }

    /* Gallery Grid */
    .gallery-container {
        padding: 0 20px;
        position: relative;
        z-index: 10;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 30px;
        margin-bottom: 60px;
    }

    .gallery-item {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s;
        height: 0;
        padding-bottom: 100%; /* Maintain square aspect ratio */
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }

    .gallery-item:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.4), 0 0 15px var(--glitch-red);
    }

    .gallery-item img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s;
        filter: grayscale(50%) contrast(120%);
    }

    .gallery-item:hover img {
        filter: grayscale(0%) contrast(130%);
        transform: scale(1.05);
    }

    .gallery-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom,
            transparent 70%,
            rgba(0,0,0,0.8) 100%);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .gallery-item:hover::before {
        opacity: 1;
    }

    .gallery-item-info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20px;
        color: white;
        z-index: 2;
        transform: translateY(100%);
        transition: transform 0.3s;
    }

    .gallery-item:hover .gallery-item-info {
        transform: translateY(0);
    }

    .gallery-item-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 24px;
        margin: 0 0 5px;
    }

    .gallery-item-category {
        font-size: 12px;
        opacity: 0.8;
        text-transform: uppercase;
    }

    /* Featured Project Section */
    .featured-project {
        padding: 60px 20px;
        background: rgba(0,0,0,0.4);
        position: relative;
        margin: 80px 0;
        overflow: hidden;
        z-index: 10;
    }

    .featured-project::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23151515'/%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E") center/cover;
        opacity: 0.2;
        z-index: -1;
    }

    .featured-header {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    }

    .featured-badge {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 18px;
        padding: 5px 15px;
        background: var(--glitch-red);
        color: black;
        transform: skew(-10deg);
        margin-right: 20px;
        letter-spacing: 2px;
    }

    .featured-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 36px;
        letter-spacing: 2px;
        margin: 0;
    }

    .featured-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 40px;
    }

    .featured-image {
        flex: 1;
        min-width: 300px;
        position: relative;
    }

    .featured-image img {
        width: 100%;
        height: auto;
        box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,50,50,0.2);
    }

    .featured-image::before {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        width: 100%;
        height: 100%;
        border: 1px solid var(--glitch-blue);
        z-index: -1;
    }

    .featured-text {
        flex: 1;
        min-width: 300px;
    }

    .featured-description {
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 30px;
    }

    .featured-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 30px;
    }

    .stat-item {
        flex: 1;
        min-width: 120px;
        border-left: 2px solid var(--glitch-red);
        padding-left: 15px;
    }

    .stat-value {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 28px;
        margin: 0;
    }

    .stat-label {
        font-size: 12px;
        text-transform: uppercase;
        opacity: 0.7;
    }

    .view-project-btn {
        display: inline-block;
        padding: 12px 30px;
        background: none;
        border: 2px solid var(--glitch-red);
        color: white;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 18px;
        letter-spacing: 2px;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
    }

    .view-project-btn:hover {
        background-color: var(--glitch-red);
        color: black;
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(255,0,0,0.3);
    }

    .view-project-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
        z-index: -1;
    }

    .view-project-btn:hover::before {
        left: 100%;
    }

    /* Process Section */
    .process-section {
        padding: 80px 20px;
        position: relative;
        z-index: 10;
    }

    .section-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 40px;
        letter-spacing: 3px;
        margin: 0 0 50px;
        text-align: center;
        position: relative;
    }

    .section-title::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 3px;
        background: var(--glitch-red);
    }

    .process-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
    }

    .process-step {
        position: relative;
        padding: 30px;
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        transition: transform 0.3s;
    }

    .process-step:hover {
        transform: translateY(-10px);
        border-color: rgba(255,50,50,0.3);
        box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    }

    .step-number {
        position: absolute;
        top: -20px;
        left: 20px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 60px;
        color: var(--glitch-red);
        opacity: 0.3;
        z-index: -1;
    }

    .step-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 24px;
        margin: 0 0 20px;
    }

    .step-description {
        font-size: 14px;
        line-height: 1.6;
    }

    /* Tools Section */
    .tools-section {
        padding: 60px 20px 100px;
        position: relative;
        z-index: 10;
    }

    .tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 30px;
        margin-top: 50px;
    }

    .tool-item {
        text-align: center;
        padding: 20px;
        background: rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.05);
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
    }

    .tool-item:hover {
        background: rgba(0,0,0,0.4);
        transform: translateY(-5px);
        border-color: rgba(255,50,50,0.3);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }

    .tool-icon {
        font-size: 40px;
        margin-bottom: 15px;
        color: var(--glitch-blue);
    }

    .tool-name {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 20px;
        margin: 0;
    }

    .tool-type {
        font-size: 12px;
        opacity: 0.6;
        margin-top: 5px;
    }

    .tool-item::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(0,204,255,0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: -1;
    }

    .tool-item:hover::before {
        opacity: 1;
    }

    /* Footer same as homepage */
    footer {
        padding: 60px 20px 40px;
        text-align: center;
        border-top: 1px solid rgba(255,50,50,0.1);
        position: relative;
        z-index: 10;
        background-color: rgba(0,0,0,0.5);
    }

    /* Add keyframes animations from homepage */
    @keyframes scanlines {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
    }

    @keyframes random-glitch {
        0%, 5%, 100% { opacity: 0; }
        1%, 4% { opacity: 0.1; background-color: rgba(255,255,255,0.2); }
        2% { opacity: 0.3; background-color: rgba(255,0,0,0.2); }
        3% { opacity: 0.2; background-color: rgba(0,255,255,0.2); }
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        .page-title {
            font-size: 50px;
        }

        .hero {
            height: 40vh;
        }

        .featured-content {
            flex-direction: column;
        }

        .process-grid, .tools-grid {
            grid-template-columns: 1fr;
        }

        .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
    }
</style>

```

</head>
<body>
<!-- Effects Overlays -->
<div class="vhs-effect"></div>
<div class="crt-effect"></div>
<div class="random-glitch"></div>

```
<!-- Header -->
<header>
    <div class="logo">XD</div>
    <div class="back-home">
        <a href="index.html" style="color: var(--text-color); text-decoration: none; font-size: 14px;">← BACK TO HOME</a>
    </div>
</header>

<!-- Navigation -->
<nav>
    <a href="#gallery">GALLERY</a>
    <a href="#featured">FEATURED WORK</a>
    <a href="#process">PROCESS</a>
    <a href="#tools">TOOLS</a>
    <a href="#contact">CONTACT</a>
</nav>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
        <h1 class="page-title">DIGITAL ART</h1>
        <p class="hero-description">Exploring the intersection of chaos and order through algorithmic processes, glitch aesthetics, and experimental techniques. My digital art investigates the boundaries between human creativity and machine expression.</p>
    </div>
</section>

<!-- Filter Categories -->
<div class="filter-categories">
    <button class="filter-button active">ALL</button>
    <button class="filter-button">GENERATIVE</button>
    <button class="filter-button">GLITCH ART</button>
    <button class="filter-button">DIGITAL PAINTING</button>
    <button class="filter-button">ABSTRACT</button>
    <button class="filter-button">EXPERIMENTAL</button>
</div>

<!-- Gallery Grid -->
<div class="gallery-container" id="gallery">
    <div class="gallery-grid">
        <!-- Gallery Items -->
        <div class="gallery-item" data-category="glitch-art">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23222222'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.5'/%3E%3Crect x='50' y='100' width='300' height='200' fill='%23ff3232' opacity='0.7'/%3E%3Crect x='90' y='130' width='220' height='140' fill='%23151515' opacity='0.9'/%3E%3Crect x='70' y='160' width='260' height='20' fill='white' opacity='0.3'/%3E%3Crect x='70' y='190' width='260' height='20' fill='white' opacity='0.3'/%3E%3Crect x='70' y='220' width='260' height='20' fill='white' opacity='0.3'/%3E%3C/svg%3E" alt="Digital Glitch Artwork">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">SIGNAL LOSS</h3>
                <p class="gallery-item-category">GLITCH ART</p>
            </div>
        </div>

        <div class="gallery-item" data-category="generative">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23222222'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Ccircle cx='200' cy='200' r='150' filter='url(%23noise)' fill='%2300ccff' opacity='0.7'/%3E%3Ccircle cx='200' cy='200' r='100' fill='%23222222' opacity='0.7'/%3E%3Ccircle cx='200' cy='200' r='50' fill='%2300ccff' opacity='0.5'/%3E%3C/svg%3E" alt="Generative Art">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">RECURSIVE LOOP #37</h3>
                <p class="gallery-item-category">GENERATIVE</p>
            </div>
        </div>

        <div class="gallery-item" data-category="digital-painting">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23333333'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath d='M100,300 C150,200 250,250 300,100' stroke='%23ff3232' stroke-width='60' fill='none' filter='url(%23noise)' opacity='0.7'/%3E%3Cpath d='M150,320 C200,220 270,270 250,150' stroke='%2300ccff' stroke-width='40' fill='none' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E" alt="Digital Painting">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">NEURAL PATHWAYS</h3>
                <p class="gallery-item-category">DIGITAL PAINTING</p>
            </div>
        </div>

        <div class="gallery-item" data-category="abstract">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23111111'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect x='50' y='50' width='300' height='300' fill='%23222222'/%3E%3Cg fill='none' stroke-width='2'%3E%3Cpath d='M50,50 L350,350' stroke='%23ff3232'/%3E%3Cpath d='M50,100 L350,400' stroke='%23ff3232'/%3E%3Cpath d='M50,150 L350,450' stroke='%23ff3232'/%3E%3Cpath d='M50,200 L350,500' stroke='%23ff3232'/%3E%3Cpath d='M50,250 L350,550' stroke='%23ff3232'/%3E%3Cpath d='M50,300 L350,600' stroke='%23ff3232'/%3E%3Cpath d='M50,350 L350,650' stroke='%23ff3232'/%3E%3Cpath d='M350,50 L50,350' stroke='%2300ccff'/%3E%3Cpath d='M350,100 L50,400' stroke='%2300ccff'/%3E%3Cpath d='M350,150 L50,450' stroke='%2300ccff'/%3E%3Cpath d='M350,200 L50,500' stroke='%2300ccff'/%3E%3Cpath d='M350,250 L50,550' stroke='%2300ccff'/%3E%3Cpath d='M350,300 L50,600' stroke='%2300ccff'/%3E%3Cpath d='M350,350 L50,650' stroke='%2300ccff'/%3E%3C/g%3E%3C/svg%3E" alt="Abstract Digital Art">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">GRID COLLAPSE</h3>
                <p class="gallery-item-category">ABSTRACT</p>
            </div>
        </div>

        <div class="gallery-item" data-category="experimental">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23222222'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Ccircle cx='200' cy='200' r='150' fill='%23ff3232' opacity='0.1'/%3E%3Ccircle cx='200' cy='200' r='100' stroke='white' stroke-width='2' fill='none'/%3E%3Cline x1='100' y1='200' x2='300' y2='200' stroke='white' stroke-width='1'/%3E%3Cline x1='200' y1='100' x2='200' y2='300' stroke='white' stroke-width='1'/%3E%3Crect x='120' y='120' width='160' height='160' fill='white' opacity='0.05'/%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E" alt="Experimental Digital Art">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">VOID PROTOCOL</h3>
                <p class="gallery-item-category">EXPERIMENTAL</p>
            </div>
        </div>

        <div class="gallery-item" data-category="glitch-art">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23151515'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect x='50' y='150' width='300' height='20' fill='%23ff3232'/%3E%3Crect x='50' y='180' width='300' height='20' fill='%2300ccff'/%3E%3Crect x='50' y='210' width='300' height='20' fill='white'/%3E%3Crect x='50' y='240' width='300' height='20' fill='%23ff3232'/%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E" alt="Digital Glitch Art">
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">CHANNEL STATIC</h3>
                <p class="gallery-item-category">GLITCH ART</p>
            </div>
        </div>
    </div>
</div>

<!-- Featured Project -->
<section class="featured-project" id="featured">
    <div class="featured-header">
        <div class="featured-badge">FEATURED</div>
        <h2 class="featured-title">DIGITAL DECAY SERIES</h2>
    </div>

    <div class="featured-content">
        <div class="featured-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23151515'/%3E%3Cfilter id='noise' x='0%25' y='0%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='600' height='400' filter='url(%23noise)' opacity='0.2'/%3E%3Cg fill='%23ff3232' opacity='0.7'%3E%3Crect x='100' y='50' width='400' height='300' filter='url(%23noise)'/%3E%3C/g%3E%3Cg fill='%2300ccff' opacity='0.5'%3E%3Crect x='150' y='100' width='300' height='200' filter='url(%23noise)'/%3E%3C/g%3E%3Cg fill='white' opacity='0.3'%3E%3Crect x='200' y='150' width='200' height='100' filter='url(%23noise)'/%3E%3C/g%3E%3Cline x1='0' y1='100' x2='600' y2='100' stroke='white' stroke-width='1' opacity='0.1'/%3E%3Cline x1='0' y1='200' x2='600' y2='200' stroke='white' stroke-width='1' opacity='0.1'/%3E%3Cline x1='0' y1='300' x2='600' y2='300' stroke='white' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E" alt="Digital Decay Series">
        </div>

        <div class="featured-text">
            <p class="featured-description">The Digital Decay Series explores the entropy of digital information through algorithmic degradation processes. Each piece begins as a pristine digital image that undergoes multiple generations of controlled corruption, mimicking how data deteriorates over time and through repeated transfers.</p>

            <div class="featured-stats">
                <div class="stat-item">
                    <p class="stat-value">12</p>
                    <p class="stat-label">Pieces in Series</p>
                </div>

                <div class="stat-item">
                    <p class="stat-value">2023</p>
                    <p class="stat-label">Year Created</p>
                </div>

                <div class="stat-item">
                    <p class="stat-value">Python</p>
                    <p class="stat-label">Primary Medium</p>
                </div>
            </div>

            <a href="#" class="view-project-btn">View Full Project</a>
        </div>
    </div>
</section>

<!-- Process Section -->
<section class="process-section" id="process">
    <h2 class="section-title">MY PROCESS</h2>

    <div class="process-grid">
        <div class="process-step">
            <div class="step-number">01</div>
            <h3 class="step-title">CONCEPT DEVELOPMENT</h3>
            <p class="step-description">Beginning with a core concept or question, I research and sketch initial ideas, exploring the intellectual and philosophical dimensions that will drive the project.</p>
        </div>

        <div class="process-step">
            <div class="step-number">02</div>
            <h3 class="step-title">ALGORITHM DESIGN</h3>
            <p class="step-description">Creating custom algorithms and code frameworks that will generate or manipulate the visual elements according to specific rules and random parameters.</p>
        </div>

        <div class="process-step">
            <div class="step-number">03</div>
            <h3 class="step-title">ITERATIVE EXPERIMENTATION</h3>
            <p class="step-description">Running multiple iterations of the algorithms with varying parameters, analyzing results and refining the code to achieve the desired aesthetic impact.</p>
        </div>

        <div class="process-step">
            <div class="step-number">04</div>
            <h3 class="step-title">CURATION & REFINEMENT</h3>
            <p class="step-description">Selecting the most compelling outputs from hundreds of iterations, then applying final adjustments to color, composition, and detail to enhance the visual impact.</p>
        </div>
    </div>
</section>

<!-- Tools Section -->
<section class="tools-section" id="tools">
    <h2 class="section-title">TOOLS & TECHNOLOGY</h2>

    <div class="tools-grid">
        <div class="tool-item">
            <div class="tool-icon">&lt;/&gt;</div>
            <h3 class="tool-name">PROCESSING</h3>
            <p class="tool-type">CREATIVE CODING</p>
        </div>

        <div class="tool-item">
            <div class="tool-icon">Py</div>
            <h3 class="tool-name">PYTHON</h3>
            <p class="tool-type">PROGRAMMING</p>
        </div>

        <div class="tool-item">
            <div class="tool-icon">Ps</div>
            <h3 class="tool-name">PHOTOSHOP</h3>
            <p class="tool-type">IMAGE EDITING</p>
        </div>

        <div class="tool-item">
            <div class="tool-icon">Ae</div>
            <h3 class="tool-name">AFTER EFFECTS</h3>
            <p class="tool-type">ANIMATION</p>
        </div>

        <div class="tool-item">
            <div class="tool-icon">Bl</div>
            <h3 class="tool-name">BLENDER</h3>
            <p class="tool-type">3D MODELING</p>
        </div>

        <div class="tool-item">
            <div class="tool-icon">TF</div>
            <h3 class="tool-name">TENSORFLOW</h3>
            <p class="tool-type">MACHINE LEARNING</p>
        </div>
    </div>
</section>

<!-- Footer -->
<footer>
    <p>© 2025 YOUR NAME • ALL RIGHTS RESERVED</p>
</footer>

<script>
    // Random glitch effect
    document.addEventListener('DOMContentLoaded', function() {
        const randomGlitch = document.querySelector('.random-glitch');

        function triggerRandomGlitch() {
            randomGlitch.style.animation = 'none';
            void randomGlitch.offsetWidth; // Trigger reflow
            randomGlitch.style.animation = 'random-glitch 0.5s forwards';

            // Random position for the glitch
            randomGlitch.style.top = Math.random() * 100 + 'vh';
            randomGlitch.style.left = Math.random() * 100 + 'vw';
            randomGlitch.style.width = (20 + Math.random() * 60) + 'px';
            randomGlitch.style.height = (5 + Math.random() * 20) + 'px';

            // Schedule next glitch
            setTimeout(triggerRandomGlitch, 2000 + Math.random() * 8000);
        }

        triggerRandomGlitch();

        // Filter gallery functionality
        const filterButtons = document.querySelectorAll('.filter-button');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter category
                const filterValue = this.textContent.toLowerCase();

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue.replace(' ', '-')) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
</script>

```

</body>
</html>