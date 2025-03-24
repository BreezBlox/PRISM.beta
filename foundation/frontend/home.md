<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UNDERGROUND | YOUR NAME</title>
<style>
/* Base Styles - WITH ATTITUDE */
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

    /* Triple Layer Texture Overlays */
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

    @keyframes scanlines {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
    }

    /* VHS Color Bands */
    .vhs-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            transparent 0%,
            rgba(255, 0, 0, 0.03) 10%,
            transparent 15%,
            rgba(0, 255, 255, 0.03) 40%,
            transparent 50%,
            rgba(255, 255, 0, 0.03) 70%,
            transparent 80%,
            rgba(255, 0, 255, 0.03) 95%,
            transparent 100%
        );
        pointer-events: none;
        z-index: 4;
        mix-blend-mode: hard-light;
    }

    /* Random Glitch Animation */
    .random-glitch {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        pointer-events: none;
        z-index: 5;
        opacity: 0;
    }

    /* Cursor Effects */
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--glitch-red);
        mix-blend-mode: exclusion;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s;
    }

    /* Header & Logo - ENHANCED */
    header {
        padding: 30px 20px;
        position: relative;
        z-index: 10;
        margin-bottom: 20px;
    }

    .logo-container {
        position: relative;
        margin-left: 40px;
        width: 150px;
        height: 150px;
        transform: perspective(500px) rotateX(10deg);
        transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .logo-container:hover {
        transform: perspective(500px) rotateX(0deg) scale(1.05);
    }

    .logo {
        position: relative;
        font-size: 60px;
        font-weight: bold;
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 2px;
        color: white;
        text-shadow:
            3px 3px 0 var(--glitch-red),
            -2px -2px 0 var(--glitch-blue);
        filter: drop-shadow(0 0 15px rgba(255,50,50,0.7));
        animation: logo-float 4s ease-in-out infinite;
    }

    @keyframes logo-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .logo::before {
        content: "XD";
        position: absolute;
        top: 0;
        left: 0;
        color: var(--glitch-blue);
        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        animation: logo-glitch 5s infinite;
    }

    .logo::after {
        content: "XD";
        position: absolute;
        top: 0;
        left: 0;
        color: var(--glitch-red);
        clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%);
        animation: logo-glitch 5s infinite reverse;
    }

    @keyframes logo-glitch {
        0%, 91%, 100% {
            transform: translate(0, 0);
            opacity: 1;
        }
        92% {
            transform: translate(-2px, 3px);
            opacity: 0.8;
        }
        93% {
            transform: translate(5px, -5px);
            opacity: 0.4;
        }
        94% {
            transform: translate(-3px, 0);
            opacity: 1;
        }
        95% {
            transform: translate(2px, 2px);
            opacity: 0.7;
        }
        96% {
            transform: translate(-5px, -2px);
            opacity: 0.9;
        }
        97% {
            transform: translate(3px, 5px);
            opacity: 0.6;
        }
        98% {
            transform: translate(0, -3px);
            opacity: 0.8;
        }
        99% {
            transform: translate(-2px, 0);
            opacity: 1;
        }
    }

    /* Torn Paper Edge */
    .torn-edge {
        position: relative;
        height: 60px;
        margin-top: -30px;
        margin-bottom: -30px;
        z-index: 10;
        overflow: hidden;
    }

    .torn-edge svg {
        width: 100%;
        height: 100%;
        transform: scaleY(-1);
        filter: drop-shadow(0 -5px 5px rgba(0,0,0,0.3));
    }

    /* Navigation - ENHANCED */
    nav {
        display: flex;
        justify-content: center;
        padding: 15px 20px;
        background-color: rgba(0,0,0,0.8);
        position: relative;
        z-index: 10;
        overflow-x: auto;
        border-top: 1px solid rgba(255,50,50,0.2);
        border-bottom: 1px solid rgba(255,50,50,0.2);
        box-shadow: 0 0 20px rgba(255,30,30,0.1);
    }

    nav a {
        color: var(--text-color);
        text-decoration: none;
        margin: 0 20px;
        padding: 8px 15px;
        font-size: 14px;
        letter-spacing: 3px;
        text-transform: uppercase;
        position: relative;
        transition: all 0.3s;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 18px;
    }

    nav a:hover {
        color: var(--glitch-red);
        text-shadow:
            2px 2px 0 rgba(0,0,0,0.8),
            -1px -1px 0 var(--glitch-blue);
        transform: scale(1.1) translateY(-2px);
    }

    nav a::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--glitch-red), transparent);
        transform: scaleX(0);
        transition: transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    }

    nav a:hover::before {
        transform: scaleX(1);
    }

    nav a::after {
        content: attr(data-text);
        position: absolute;
        left: 15px;
        bottom: -10px;
        font-size: 10px;
        opacity: 0;
        color: var(--glitch-blue);
        transition: all 0.3s;
        transform: translateY(5px);
    }

    nav a:hover::after {
        opacity: 0.8;
        transform: translateY(0);
    }

    /* Main Content - ENHANCED */
    .content-sections {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 40px 20px;
        position: relative;
        z-index: 10;
    }

    .section {
        flex: 1;
        min-width: 300px;
        margin: 20px;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        border: 1px solid rgba(255,255,255,0.05);
        box-shadow:
            0 0 30px rgba(0,0,0,0.6),
            0 0 10px rgba(255,0,0,0.3);
        transform: perspective(800px) rotateY(5deg);
    }

    .section:hover {
        transform: perspective(800px) rotateY(0deg) translateY(-10px);
        box-shadow:
            0 20px 40px rgba(0,0,0,0.7),
            0 0 20px rgba(255,0,0,0.5);
    }

    .section::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg,
            rgba(255,0,0,0.2) 0%,
            transparent 50%,
            rgba(0,255,255,0.2) 100%);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.4s;
    }

    .section:hover::before {
        opacity: 1;
    }

    .section img {
        width: 100%;
        height: auto;
        filter: grayscale(70%) contrast(130%) brightness(0.8);
        transition: all 0.5s;
        transform-origin: center center;
    }

    .section:hover img {
        filter: grayscale(20%) contrast(150%) brightness(1);
        transform: scale(1.05);
    }

    .section-title {
        position: absolute;
        top: 20px;
        left: 0;
        padding: 15px 30px;
        background-color: rgba(0,0,0,0.8);
        font-size: 28px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-family: 'Bebas Neue', sans-serif;
        clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        z-index: 2;
        box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
    }

    .glitch-effect {
        position: relative;
        display: inline-block;
        color: white;
        text-shadow:
            1px 1px 0 rgba(0,0,0,0.3),
            -1px -1px 0 rgba(0,0,0,0.3);
        animation: text-opacity 3s infinite;
    }

    @keyframes text-opacity {
        0%, 90%, 100% { opacity: 1; }
        91%, 94%, 98% { opacity: 0.8; }
        92%, 95%, 99% { opacity: 0.4; }
        93%, 96%, 97% { opacity: 0.6; }
    }

    .glitch-effect::before,
    .glitch-effect::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: steps(2, end);
    }

    .glitch-effect::before {
        text-shadow: 2px 0 var(--glitch-red);
        animation-name: glitch-anim-1;
        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    }

    .glitch-effect::after {
        text-shadow: -2px 0 var(--glitch-blue);
        animation-name: glitch-anim-2;
        clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    }

    @keyframes glitch-anim-1 {
        0%, 90%, 100% { transform: translate(0, 0); }
        91% { transform: translate(2px, -1px); }
        92% { transform: translate(-1px, 2px); }
        93% { transform: translate(1px, -2px); }
        94% { transform: translate(-2px, 1px); }
        95% { transform: translate(2px, -1px); }
        96% { transform: translate(-1px, 2px); }
        97% { transform: translate(1px, -1px); }
        98% { transform: translate(-1px, 1px); }
        99% { transform: translate(1px, -1px); }
    }

    @keyframes glitch-anim-2 {
        0%, 90%, 100% { transform: translate(0, 0); }
        91% { transform: translate(-2px, 1px); }
        92% { transform: translate(1px, -2px); }
        93% { transform: translate(-1px, 2px); }
        94% { transform: translate(2px, -1px); }
        95% { transform: translate(-2px, 1px); }
        96% { transform: translate(1px, -2px); }
        97% { transform: translate(-1px, 1px); }
        98% { transform: translate(1px, -1px); }
        99% { transform: translate(-1px, 1px); }
    }

    /* Section Overlay Text */
    .section-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
        padding: 30px 20px 20px 20px;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        z-index: 3;
    }

    .section:hover .section-overlay {
        transform: translateY(0);
    }

    .section-overlay h3 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 24px;
        margin: 0 0 10px 0;
        color: white;
        letter-spacing: 2px;
    }

    .section-overlay p {
        font-size: 12px;
        margin: 0;
        opacity: 0.8;
        line-height: 1.6;
    }

    /* Distortion Lines - ENHANCED */
    .distortion-line {
        height: 2px;
        width: 100%;
        background: linear-gradient(90deg, transparent, var(--glitch-red), transparent);
        margin: 60px 0;
        position: relative;
        overflow: hidden;
    }

    .distortion-line::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        height: 20px;
        background: linear-gradient(90deg, transparent, rgba(255,50,50,0.3), transparent);
        filter: blur(5px);
    }

    .distortion-line::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 2px;
        background: linear-gradient(90deg, transparent, white, transparent);
        animation: line-slide 3s linear infinite;
    }

    @keyframes line-slide {
        0% { left: -50%; }
        100% { left: 100%; }
    }

    /* CRT Display Effect */
    .crt-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 6;
        pointer-events: none;
        mix-blend-mode: overlay;
        background: radial-gradient(
            ellipse at center,
            rgba(100, 100, 100, 0.05) 0%,
            rgba(0, 0, 0, 0.2) 100%
        );
    }

    /* Random Noise Particles */
    .noise-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 7;
        pointer-events: none;
        opacity: 0.03;
    }

    /* Footer - ENHANCED */
    footer {
        padding: 60px 20px 40px;
        text-align: center;
        border-top: 1px solid rgba(255,50,50,0.1);
        position: relative;
        z-index: 10;
        background-color: rgba(0,0,0,0.5);
    }

    .social-links {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }

    .social-links a {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin: 0 15px;
        border: 2px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        transition: all 0.4s;
        position: relative;
        overflow: hidden;
        transform: skew(-5deg);
        box-shadow:
            inset 0 0 10px rgba(255,50,50,0.1),
            0 5px 15px rgba(0,0,0,0.3);
    }

    .social-links a:hover {
        color: white;
        border-color: var(--glitch-red);
        transform: skew(-5deg) translateY(-5px) scale(1.1);
        box-shadow:
            inset 0 0 20px rgba(255,50,50,0.3),
            0 10px 20px rgba(0,0,0,0.4);
        text-shadow: 0 0 10px var(--glitch-red);
    }

    .social-links a::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,50,50,0.4), transparent);
        transition: left 0.5s;
    }

    .social-links a:hover::before {
        left: 100%;
    }

    footer p {
        font-size: 14px;
        opacity: 0.6;
        letter-spacing: 1px;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.8;
    }

    footer .copyright {
        margin-top: 30px;
        font-size: 12px;
        opacity: 0.4;
    }

    footer .copyright span {
        color: var(--glitch-red);
    }

    /* Scroll Indicator */
    .scroll-indicator {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(255,255,255,0.6);
        font-size: 18px;
        z-index: 100;
        transition: all 0.3s;
        opacity: 0;
    }

    .scroll-indicator.visible {
        opacity: 1;
    }

    .scroll-indicator:hover {
        border-color: var(--glitch-red);
        color: white;
        transform: scale(1.1);
    }

    /* Responsive Design - ENHANCED */
    @media (max-width: 768px) {
        .content-sections {
            flex-direction: column;
        }

        .section {
            margin: 30px 10px;
            min-width: calc(100% - 20px);
            transform: perspective(800px) rotateY(0);
        }

        nav {
            padding: 10px 5px;
        }

        nav a {
            margin: 0 10px;
            padding: 5px;
            font-size: 16px;
        }

        .logo-container {
            margin-left: 20px;
            width: 100px;
            height: 100px;
        }

        .logo {
            font-size: 40px;
        }

        .section-title {
            font-size: 22px;
            padding: 10px 20px;
        }

        .social-links a {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }

        .scroll-indicator {
            bottom: 20px;
            right: 20px;
            width: 30px;
            height: 30px;
            font-size: 14px;
        }
    }

    /* Animations for Random Glitches */
    @keyframes random-glitch {
        0%, 5%, 100% {
            opacity: 0;
        }
        1%, 4% {
            opacity: 0.1;
            background-color: rgba(255, 255, 255, 0.2);
            transform: translate(10px, 0);
        }
        2% {
            opacity: 0.3;
            background-color: rgba(255, 0, 0, 0.2);
            transform: translate(-10px, 0);
        }
        3% {
            opacity: 0.2;
            background-color: rgba(0, 255, 255, 0.2);
            transform: translate(0, 0);
        }
    }
</style>

```

</head>
<body>
<!-- VHS Effect Overlay -->
<div class="vhs-effect"></div>

```
<!-- Random Glitch Element -->
<div class="random-glitch"></div>

<!-- CRT Display Effect -->
<div class="crt-effect"></div>

<!-- Noise Particles -->
<div class="noise-particles" id="noiseCanvas"></div>

<!-- Cursor Trail Elements -->
<div class="cursor-trail" id="cursor1"></div>
<div class="cursor-trail" id="cursor2"></div>
<div class="cursor-trail" id="cursor3"></div>

<header>
    <div class="logo-container">
        <div class="logo">XD</div>
    </div>
</header>

<div class="torn-edge">
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0,0 Q50,30 100,15 Q150,0 200,20 Q250,40 300,15 Q350,0 400,25 Q450,45 500,15 Q550,0 600,30 Q650,60 700,25 Q750,0 800,20 Q850,40 900,15 Q950,0 1000,30 Q1050,55 1100,15 Q1150,0 1200,20 L1200,60 L0,60 Z" fill="#0a0a0a" />
    </svg>
</div>

<nav>
    <a href="#work" data-text="visual projects">WORK</a>
    <a href="#digital" data-text="generated art">DIGITAL ART</a>
    <a href="#crypto" data-text="blockchain creations">CRYPTO ART</a>
    <a href="#photography" data-text="captured moments">PHOTOGRAPHY</a>
    <a href="#about" data-text="identity">ABOUT</a>
    <a href="#contact" data-text="reach out">CONTACT</a>
</nav>

<div class="content-sections">
    <div class="section">
        <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23151515'/%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.2'/%3E%3Cg fill='%23ffffff' font-family='monospace' font-weight='bold'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40'%3ESUPER%3C/text%3E%3Ctext x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-size='40'%3ETOP%3C/text%3E%3Ctext x='50%25' y='74%25' dominant-baseline='middle' text-anchor='middle' font-size='40'%3ESECRET%3C/text%3E%3C/g%3E%3C/svg%3E" alt="Photography">
        <div class="section-title">
            <span class="glitch-effect" data-text="PHOTOGRAPHY">PHOTOGRAPHY</span>
        </div>
        <div class="section-overlay">
            <h3>VISUAL STORYTELLING</h3>
            <p>Raw, unfiltered moments captured through the lens. Urban exploration, abandoned places, and the beauty in chaos.</p>
        </div>
    </div>

    <div class="section">
        <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23222222'/%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.15'/%3E%3Ccircle cx='150' cy='150' r='60' fill='%23ff3232' opacity='0.9'/%3E%3Crect x='180' y='180' width='120' height='120' fill='%233232ff' opacity='0.8'/%3E%3Cpolygon points='100,300 180,200 260,300' fill='%2332ff32' opacity='0.7'/%3E%3Cline x1='50' y1='50' x2='350' y2='350' stroke='white' stroke-width='2' opacity='0.6'/%3E%3Cline x1='350' y1='50' x2='50' y2='350' stroke='white' stroke-width='2' opacity='0.6'/%3E%3C/svg%3E" alt="Digital Art">
        <div class="section-title">
            <span class="glitch-effect" data-text="DIGITAL ART">DIGITAL ART</span>
        </div>
        <div class="section-overlay">
            <h3>DIGITAL EXPRESSIONS</h3>
            <p>Generative algorithms, glitch aesthetics, and hybrid creations that blur the line between chaos and design.</p>
        </div>
    </div>

    <div class="section">
        <img src="data:image/svg+xml,%3Csvg xmlns='<http://www.w3.org/2000/svg>' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23101010'/%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.2'/%3E%3Cpolygon points='200,50 350,200 200,350 50,200' stroke='%233232ff' stroke-width='8' fill='none'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='65' fill='%233232ff'%3Et%3C/text%3E%3Cg opacity='0.15'%3E%3Cline x1='0' y1='100' x2='400' y2='100' stroke='white' stroke-width='1'/%3E%3Cline x1='0' y1='150' x2='400' y2='150' stroke='white' stroke-width='1'/%3E%3Cline x1='0' y1='200' x2='400' y2='200' stroke='white' stroke-width='1'/%3E%3Cline x1='0' y1='250' x2='400' y2='250' stroke='white' stroke-width='1'/%3E%3Cline x1='0' y1='300' x2='400' y2='300' stroke='white' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E" alt="Crypto Art">
        <div class="section-title">
            <span class="glitch-effect" data-text="CRYPTO ART">CRYPTO ART</span>
        </div>
        <div class="section-overlay">
            <h3>BLOCKCHAIN CREATIONS</h3>
            <p>Limited edition tokenized artworks exploring the intersection of art, technology and decentralized ownership.</p>
        </div>
    </div>
</div>

<div class="distortion-line"></div>

<footer>
    <div class="social-links">
        <a href="#">X</a>
        <a href="#">IG</a>
        <a href="#">GH</a>
        <a href="#">OS</a>
    </div>
    <p>Pushing the boundaries of digital expression through experimental techniques, unconventional approaches, and relentless innovation.</p>
    <div class="copyright">© 2025 <span>YOUR NAME</span> • ALL RIGHTS RESERVED</div>
</footer>

<div class="scroll-indicator" id="scrollIndicator">↑</div>

<script>
    // Add intense visual effects and random glitches
    document.addEventListener('DOMContentLoaded', function() {
        // Random glitch effect
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

        // Cursor trail effect
        const cursorTrails = [
            document.getElementById('cursor1'),
            document.getElementById('cursor2'),
            document.getElementById('cursor3')
        ];

        let cursorX = 0;
        let cursorY = 0;
        let trailPositions = [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];

        document.addEventListener('mousemove', function(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;

            // Make the first cursor trail visible immediately
            cursorTrails[0].style.opacity = 0.6;
            cursorTrails[0].style.left = cursorX + 'px';
            cursorTrails[0].style.top = cursorY + 'px';
        });

        function animateCursorTrails() {
            // Update positions with delay
            for (let i = trailPositions.length - 1; i > 0; i--) {
                trailPositions[i].x = trailPositions[i-1].x;
                trailPositions[i].y = trailPositions[i-1].y;
            }

            trailPositions[0].x = cursorX;
            trailPositions[0].y = cursorY;

            // Apply positions to elements (skipping the first one that follows cursor directly)
            for (let i = 1; i < cursorTrails.length; i++) {
                cursorTrails[i].style.opacity = 0.3 - (i * 0.1);
                cursorTrails[i].style.left = trailPositions[i].x + 'px';
                cursorTrails[i].style.top = trailPositions[i].y + 'px';
                cursorTrails[i].style.width = (10 - i * 2) + 'px';
                cursorTrails[i].style.height = (10 - i * 2) + 'px';
            }

            requestAnimationFrame(animateCursorTrails);
        }

        animateCursorTrails();

        // Noise particles
        const noiseCanvas = document.getElementById('noiseCanvas');

        function createNoiseParticles() {
            let particles = '';
            for (let i = 0; i < 100; i++) {
                const size = Math.random() * 3;
                particles += `<div style="
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: white;
                    top: ${Math.random() * 100}vh;
                    left: ${Math.random() * 100}vw;
                    opacity: ${Math.random() * 0.5};
                    animation: particle-flicker ${1 + Math.random() * 3}s infinite alternate;
                "></div>`;
            }
            noiseCanvas.innerHTML = particles;
        }

        createNoiseParticles();

        // Add a style for particle flicker animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-flicker {
                0%, 100% { opacity: 0; }
                50% { opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);

        // Scroll indicator
        const scrollIndicator = document.getElementById('scrollIndicator');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollIndicator.classList.add('visible');
                scrollIndicator.innerHTML = '↑';
            } else {
                scrollIndicator.classList.remove('visible');
            }

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                scrollIndicator.innerHTML = '↑';
            }
        });

        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
</script>

```

</body>
</html>