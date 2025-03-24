<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ABOUT | YOUR NAME</title>
<style>
/* Base Styles - Same as home page */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@400;700&family=Major+Mono+Display&display=swap');

```
    :root {
        --glitch-red: #ff1a1a;
        --glitch-blue: #00ccff;
        --glitch-green: #00ff66;
        --dark-bg: #0a0a0a;
        --text-color: #e6e6e6;
        --highlight: #ff3232;
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

    /* Effects from homepage */
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

    /* VHS, CRT, and other effects */
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

    /* Header & Navigation */
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

    /* About Page Specific Styles */
    /* Identity Hero Section */
    .identity-hero {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 0 20px;
        z-index: 10;
    }

    .identity-hero::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.7) 100%);
        z-index: -1;
    }

    .identity-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
        position: relative;
    }

    .identity-visual {
        flex: 1;
        min-width: 300px;
        position: relative;
    }

    .id-portrait {
        position: relative;
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
        filter: grayscale(100%) contrast(120%);
        transition: all 0.5s;
        opacity: 0.9;
    }

    .id-portrait:hover {
        filter: grayscale(70%) contrast(130%);
    }

    .id-portrait svg {
        width: 100%;
        height: auto;
        display: block;
        position: relative;
        z-index: 1;
    }

    .portrait-glitch {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--glitch-red);
        mix-blend-mode: overlay;
        z-index: 2;
        opacity: 0;
        clip-path: polygon(0 30%, 100% 20%, 100% 40%, 0 50%);
    }

    .id-portrait:hover .portrait-glitch {
        animation: portrait-distort 2s infinite;
    }

    @keyframes portrait-distort {
        0%, 100% { opacity: 0; transform: translateX(0); }
        10% { opacity: 0.2; transform: translateX(10px); }
        20% { opacity: 0; transform: translateX(-8px); }
        30% { opacity: 0.3; transform: translateX(5px); }
        40% { opacity: 0; transform: translateX(0); }
    }

    .portrait-frame {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 1px solid rgba(255,50,50,0.3);
        z-index: 0;
    }

    .portrait-frame::before {
        content: "";
        position: absolute;
        top: 20px;
        left: 20px;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0,204,255,0.3);
        z-index: -1;
    }

    .identity-text {
        flex: 1;
        min-width: 300px;
        padding: 40px;
        position: relative;
    }

    .identity-badge {
        position: absolute;
        top: 0;
        left: 40px;
        background: var(--highlight);
        color: black;
        font-family: 'Bebas Neue', sans-serif;
        padding: 5px 15px;
        font-size: 14px;
        letter-spacing: 1px;
        transform: translateY(-50%);
    }

    .identity-name {
        font-family: 'Major Mono Display', monospace;
        font-size: 60px;
        margin: 0 0 30px;
        line-height: 1;
        position: relative;
        display: inline-block;
    }

    .identity-name::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 80px;
        height: 4px;
        background: var(--highlight);
    }

    .identity-title {
        font-family: 'Roboto Mono', monospace;
        font-size: 18px;
        margin: 0 0 30px;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.7;
    }

    .identity-bio {
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 40px;
        position: relative;
    }

    .identity-bio p {
        margin: 0 0 20px;
    }

    .identity-bio::before {
        content: "< ";
        color: var(--highlight);
        opacity: 0.7;
    }

    .identity-bio::after {
        content: " />";
        color: var(--highlight);
        opacity: 0.7;
    }

    .identity-links {
        display: flex;
        gap: 15px;
    }

    .identity-link {
        display: inline-block;
        padding: 10px 25px;
        background: none;
        border: 1px solid var(--highlight);
        color: white;
        text-decoration: none;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 16px;
        letter-spacing: 1px;
        transition: all 0.3s;
        position: relative;
        overflow: hidden;
    }

    .identity-link:hover {
        background: var(--highlight);
        color: black;
        transform: translateY(-3px);
    }

    .identity-link::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }

    .identity-link:hover::before {
        left: 100%;
    }

    /* Separator */
    .section-separator {
        height: 2px;
        width: 100%;
        background: linear-gradient(90deg, transparent, var(--highlight), transparent);
        margin: 80px 0;
        position: relative;
        overflow: hidden;
    }

    .section-separator::before {
        content: "";
        position: absolute;
        top: -8px;
        left: 0;
        width: 100%;
        height: 16px;
        background: linear-gradient(90deg, transparent, rgba(255,50,50,0.3), transparent);
        filter: blur(5px);
    }

    /* Skills Section */
    .skills-section {
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
        background: var(--highlight);
    }

    .skills-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .skills-groups {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
    }

    .skills-group {
        flex: 1;
        min-width: 250px;
    }

    .skills-group-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 24px;
        margin: 0 0 20px;
        color: var(--highlight);
        letter-spacing: 1px;
    }

    .skill-bar {
        margin-bottom: 20px;
    }

    .skill-name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .skill-label {
        font-size: 14px;
        text-transform: uppercase;
    }

    .skill-level {
        font-size: 14px;
        opacity: 0.7;
    }

    .skill-progress {
        height: 5px;
        background: rgba(255,255,255,0.1);
        position: relative;
    }

    .skill-progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--highlight);
        transition: width 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        width: 0;
    }

    .skill-progress-fill::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
        background: white;
    }

    /* Experience Timeline */
    .experience-section {
        padding: 80px 20px;
        position: relative;
        z-index: 10;
        background-color: rgba(0,0,0,0.2);
    }

    .timeline-container {
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        padding: 20px 0;
    }

    .timeline-line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 2px;
        background: rgba(255,50,50,0.3);
        transform: translateX(-50%);
    }

    .timeline-item {
        margin-bottom: 60px;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .timeline-item:last-child {
        margin-bottom: 0;
    }

    .timeline-content {
        width: 45%;
        background: rgba(0,0,0,0.4);
        padding: 20px;
        position: relative;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transition: all 0.3s;
    }

    .timeline-content:hover {
        transform: translateY(-5px);
        border-color: var(--highlight);
        box-shadow: 0 15px 40px rgba(0,0,0,0.4);
    }

    .timeline-date {
        position: absolute;
        top: -15px;
        background: var(--highlight);
        color: black;
        padding: 5px 10px;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 14px;
    }

    .timeline-item:nth-child(odd) .timeline-content {
        margin-right: 5%;
    }

    .timeline-item:nth-child(even) .timeline-content {
        margin-left: 5%;
    }

    .timeline-item:nth-child(odd) .timeline-date {
        right: 20px;
    }

    .timeline-item:nth-child(even) .timeline-date {
        left: 20px;
    }

    .timeline-dot {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--highlight);
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        z-index: 2;
        border: 3px solid var(--dark-bg);
        box-shadow: 0 0 10px rgba(255,0,0,0.5);
    }

    .timeline-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 20px;
        margin: 0 0 10px;
    }

    .timeline-company {
        font-size: 16px;
        opacity: 0.7;
        margin-bottom: 15px;
    }

    .timeline-description {
        font-size: 14px;
        line-height: 1.6;
    }

    /* Personal Philosophy Section */
    .philosophy-section {
        padding: 80px 20px;
        position: relative;
        z-index: 10;
    }

    .philosophy-container {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        align-items: center;
    }

    .philosophy-text {
        flex: 2;
        min-width: 300px;
    }

    .philosophy-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 32px;
        margin: 0 0 20px;
        color: var(--highlight);
    }

    .philosophy-quote {
        font-family: 'Major Mono Display', monospace;
        font-size: 24px;
        margin: 0 0 30px;
        line-height: 1.4;
        position: relative;
        padding-left: 20px;
        border-left: 3px solid var(--highlight);
    }

    .philosophy-content {
        font-size: 16px;
        line-height: 1.8;
    }

    .philosophy-content p {
        margin: 0 0 20px;
    }

    .philosophy-visual {
        flex: 1;
        min-width: 250px;
        position: relative;
    }

    .philosophy-image {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .philosophy-image svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 8s linear;
        transform-origin: center center;
    }

    .philosophy-image:hover svg {
        transform: scale(1.2) rotate(5deg);
    }

    /* Contact CTA Section */
    .contact-section {
        padding: 100px 20px;
        position: relative;
        z-index: 10;
        background-color: rgba(0,0,0,0.4);
        text-align: center;
    }

    .contact-container {
        max-width: 600px;
        margin: 0 auto;
    }

    .contact-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 40px;
        margin: 0 0 20px;
    }

    .contact-subtitle {
        font-size: 18px;
        margin: 0 0 40px;
        opacity: 0.7;
    }

    .contact-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
    }

    .form-group {
        position: relative;
    }

    .form-group.full {
        grid-column: 1 / -1;
    }

    .form-input {
        width: 100%;
        padding: 15px;
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: white;
        font-family: 'Roboto Mono', monospace;
        font-size: 14px;
        transition: all 0.3s;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--highlight);
        box-shadow: 0 0 10px rgba(255,0,0,0.2);
    }

    textarea.form-input {
        min-height: 150px;
        resize: vertical;
    }

    .submit-btn {
        display: inline-block;
        padding: 15px 40px;
        background: var(--highlight);
        color: black;
        border: none;
        font-family: 'Bebas Neue', sans-serif;
        font-size: 18px;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all 0.3s;
        text-transform: uppercase;
    }

    .submit-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }

    .social-links {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 50px;
    }

    .social-link {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        color: white;
        text-decoration: none;
        font-size: 18px;
        transition: all 0.3s;
    }

    .social-link:hover {
        background: var(--highlight);
        color: black;
        transform: translateY(-5px) rotate(5deg);
        border-color: var(--highlight);
    }

    /* Footer */
    footer {
        padding: 40px 20px;
        text-align: center;
        border-top: 1px solid rgba(255,50,50,0.1);
        position: relative;
        z-index: 10;
        background-color: rgba(0,0,0,0.3);
    }

    footer p {
        font-size: 14px;
        opacity: 0.6;
        margin: 0;
    }

    /* Animations */
    @keyframes random-glitch {
        0%, 5%, 100% { opacity: 0; }
        1%, 4% { opacity: 0.1; background-color: rgba(255,255,255,0.2); }
        2% { opacity: 0.3; background-color: rgba(255,0,0,0.2); }
        3% { opacity: 0.2; background-color: rgba(0,255,255,0.2); }
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        .identity-container {
            flex-direction: column;
            text-align: center;
        }

        .identity-name::after {
            left: 50%;
            transform: translateX(-50%);
        }

        .identity-badge {
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        .identity-links {
            justify-content: center;
        }

        .timeline-line {
            left: 30px;
        }

        .timeline-item {
            justify-content: flex-start;
        }

        .timeline-content {
            width: calc(100% - 80px);
            margin-left: 80px !important;
            margin-right: 0 !important;
        }

        .timeline-date {
            left: 20px !important;
            right: auto !important;
        }

        .timeline-dot {
            left: 30px;
        }

        .contact-form {
            grid-template-columns: 1fr;
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
    <a href="#about">ABOUT</a>
    <a href="#skills">SKILLS</a>
    <a href="#experience">EXPERIENCE</a>
    <a href="#philosophy">PHILOSOPHY</a>
    <a href="#contact">CONTACT</a>
</nav>

<!-- Identity Hero Section -->
<section class="identity-hero" id="about">
    <div class="identity-container">
        <div class="identity-visual">
            <div class="id-portrait">
                <!-- Abstract portrait placeholder -->
                <svg viewBox="0 0 400 400" xmlns="<http://www.w3.org/2000/svg>">
                    <rect width="400" height="400" fill="#151515"/>
                    <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch"/>
                    </filter>
                    <!-- Abstract shape suggesting a face/silhouette -->
                    <ellipse cx="200" cy="160" rx="120" ry="140" fill="#252525"/>
                    <rect x="120" y="220" width="160" height="180" fill="#252525"/>
                    <!-- Glitched elements -->
                    <rect x="130" y="150" width="140" height="20" fill="#353535" filter="url(#noise)"/>
                    <rect x="150" y="180" width="100" height="15" fill="#303030" filter="url(#noise)"/>
                    <rect x="160" y="210" width="80" height="10" fill="#404040" filter="url(#noise)"/>
                    <!-- Red accents -->
                    <rect x="185" y="130" width="30" height="5" fill="#ff3232" opacity="0.7"/>
                    <rect x="175" y="260" width="50" height="8" fill="#ff3232" opacity="0.5"/>
                    <rect x="160" y="300" width="80" height="2" fill="#ff3232" opacity="0.3"/>
                    <!-- Noise overlay -->
                    <rect width="400" height="400" fill="transparent" filter="url(#noise)" opacity="0.3"/>
                </svg>
                <div class="portrait-glitch"></div>
                <div class="portrait-frame"></div>
            </div>
        </div>

        <div class="identity-text">
            <div class="identity-badge">DIGITAL CREATOR</div>
            <h1 class="identity-name">YOUR NAME</h1>
            <p class="identity-title">Digital Artist / Crypto Art Creator / Full-stack Developer</p>
            <div class="identity-bio">
                <p>Currently, I'm enrolled in a coding bootcamp with Bottega University, pursuing a Full-stack development certificate. Focused on AI technologies since 2020, with particular interest in developing machine learning systems in production environments.</p>
                <p>I also specialize in applying AI to optimize workflows across personal and professional contexts.</p>
            </div>
            <div class="identity-links">
                <a href="#contact" class="identity-link">GET IN TOUCH</a>
                <a href="#projects" class="identity-link">VIEW WORK</a>
            </div>
        </div>
    </div>
</section>

<div class="section-separator"></div>

<!-- Skills Section -->
<section class="skills-section" id="skills">
    <h2 class="section-title">SKILL SET</h2>

    <div class="skills-container">
        <div class="skills-groups">
            <div class="skills-group">
                <h3 class="skills-group-title">DEVELOPMENT</h3>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">JavaScript</span>
                        <span class="skill-level">92%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="92%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Python</span>
                        <span class="skill-level">85%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="85%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">React</span>
                        <span class="skill-level">80%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="80%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Node.js</span>
                        <span class="skill-level">78%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="78%"></div>
                    </div>
                </div>
            </div>

            <div class="skills-group">
                <h3 class="skills-group-title">DESIGN</h3>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Digital Art</span>
                        <span class="skill-level">95%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="95%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Photoshop</span>
                        <span class="skill-level">90%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="90%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">UI/UX</span>
                        <span class="skill-level">82%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="82%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">3D Modeling</span>
                        <span class="skill-level">75%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="75%"></div>
                    </div>
                </div>
            </div>

            <div class="skills-group">
                <h3 class="skills-group-title">TECHNOLOGY</h3>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">AI/ML</span>
                        <span class="skill-level">88%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="88%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Blockchain</span>
                        <span class="skill-level">83%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="83%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">Creative Coding</span>
                        <span class="skill-level">87%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="87%"></div>
                    </div>
                </div>

                <div class="skill-bar">
                    <div class="skill-name">
                        <span class="skill-label">DevOps</span>
                        <span class="skill-level">72%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-fill" style="width: 0%" data-width="72%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Experience Timeline -->
<section class="experience-section" id="experience">
    <h2 class="section-title">JOURNEY</h2>

    <div class="timeline-container">
        <div class="timeline-line"></div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">PRESENT</div>
                <h3 class="timeline-title">Full-stack Development</h3>
                <p class="timeline-company">Bottega University Bootcamp</p>
                <p class="timeline-description">Currently pursuing a certificate in Full-stack development, specializing in modern JavaScript frameworks and backend technologies.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2023</div>
                <h3 class="timeline-title">Lead Digital Artist</h3>
                <p class="timeline-company">Future Works Studio</p>
                <p class="timeline-description">Created concept art and digital illustrations for various client projects, specializing in AI-generated art direction and implementation.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2022</div>
                <h3 class="timeline-title">Web3 Developer</h3>
                <p class="timeline-company">BlockChain Innovations</p>
                <p class="timeline-description">Developed smart contracts and frontend interfaces for NFT marketplaces, focusing on secure and efficient blockchain implementations.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>

        <div class="timeline-item">
            <div class="timeline-content">
                <div class="timeline-date">2020</div>
                <h3 class="timeline-title">Frontend Developer</h3>
                <p class="timeline-company">Digital Solutions Inc.</p>
                <p class="timeline-description">Built responsive and interactive web applications using React and modern JavaScript, with a focus on performance and accessibility.</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    </div>
</section>

<!-- Philosophy Section -->
<section class="philosophy-section" id="philosophy">
    <div class="philosophy-container">
        <div class="philosophy-text">
            <h2 class="philosophy-title">MY APPROACH</h2>
            <blockquote class="philosophy-quote">
                at the intersection of technology and creativity, we find the most profound innovations.
            </blockquote>

            <div class="philosophy-content">
                <p>I believe in the power of blending technical expertise with artistic vision. My approach to digital creation is guided by a deep curiosity about how technology can extend human creativity beyond traditional boundaries.</p>
                <p>Whether working on code, digital art, or blockchain projects, I focus on finding the balance between structured technical implementation and expressive creative freedom.</p>
                <p>I'm constantly exploring the boundaries between human and machine creativity, looking for ways to create systems and artworks that surprise and inspire.</p>
            </div>
        </div>

        <div class="philosophy-visual">
            <div class="philosophy-image">
                <svg viewBox="0 0 400 400" xmlns="<http://www.w3.org/2000/svg>">
                    <rect width="400" height="400" fill="#101010"/>
                    <filter id="noise2" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" stitchTiles="stitch"/>
                    </filter>
                    <!-- Abstract visualization of concept -->
                    <g opacity="0.3">
                        <rect width="400" height="400" filter="url(#noise2)"/>
                    </g>
                    <!-- Circuit-like paths -->
                    <g fill="none" stroke="#ff3232" stroke-width="1" opacity="0.5">
                        <path d="M50,200 C100,100 300,300 350,200" filter="url(#noise2)"/>
                        <path d="M50,300 C150,200 250,250 350,150" filter="url(#noise2)"/>
                        <path d="M200,50 C100,150 300,150 200,350" filter="url(#noise2)"/>
                    </g>
                    <!-- Nodes -->
                    <circle cx="50" cy="200" r="5" fill="#ff3232"/>
                    <circle cx="350" cy="200" r="5" fill="#ff3232"/>
                    <circle cx="50" cy="300" r="5" fill="#ff3232"/>
                    <circle cx="350" cy="150" r="5" fill="#ff3232"/>
                    <circle cx="200" cy="50" r="5" fill="#ff3232"/>
                    <circle cx="200" cy="350" r="5" fill="#ff3232"/>
                    <!-- Center concept -->
                    <circle cx="200" cy="200" r="40" fill="none" stroke="#ff3232" stroke-width="2"/>
                    <circle cx="200" cy="200" r="20" fill="#ff3232" opacity="0.3"/>
                </svg>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section class="contact-section" id="contact">
    <div class="contact-container">
        <h2 class="contact-title">GET IN TOUCH</h2>
        <p class="contact-subtitle">Interested in collaboration? Send me a message and let's create something together.</p>

        <form class="contact-form">
            <div class="form-group">
                <input type="text" class="form-input" placeholder="NAME">
            </div>

            <div class="form-group">
                <input type="email" class="form-input" placeholder="EMAIL">
            </div>

            <div class="form-group full">
                <input type="text" class="form-input" placeholder="SUBJECT">
            </div>

            <div class="form-group full">
                <textarea class="form-input" placeholder="YOUR MESSAGE"></textarea>
            </div>

            <div class="form-group full">
                <button type="submit" class="submit-btn">SEND MESSAGE</button>
            </div>
        </form>

        <div class="social-links">
            <a href="#" class="social-link">X</a>
            <a href="#" class="social-link">IG</a>
            <a href="#" class="social-link">GH</a>
            <a href="#" class="social-link">LI</a>
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
        // Random glitch
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

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress-fill');

        function animateSkillBars() {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            });
        }

        // Use Intersection Observer to trigger skill bar animation when visible
        const skillsSection = document.querySelector('.skills-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);

        // Smooth scroll for navigation links
        document.querySelectorAll('nav a, .identity-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });
</script>

```

</body>
</html>