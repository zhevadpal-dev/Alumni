/**
 * Alumly — Shared View Styles Helper
 * Canonical design.md & Amplemarket Editorial SaaS Specification
 */

const fs = require('fs');
const path = require('path');

let cachedCss = null;

function getGlobalStyles() {
  if (!cachedCss) {
    try {
      const cssPath = path.join(__dirname, '../../public/css/style.css');
      cachedCss = fs.readFileSync(cssPath, 'utf8');
    } catch (e) {
      cachedCss = `
        :root {
          --color-phoenix-orange: #e8400d;
          --gradient-phoenix-orange: radial-gradient(386.06% 162.79% at 3.76985% -12.1005%, rgb(232, 64, 13) 0%, rgb(255, 238, 216) 31.14%, rgb(208, 178, 255) 81.98%);
          --color-midnight-indigo: #10054d;
          --color-charcoal: #272625;
          --color-ink: #111111;
          --color-canvas-white: #ffffff;
          --color-cream-wash: #f6f5f3;
          --color-ash: #6d6c6b;
          --color-stone: #b1b1af;
          --color-pearl: #ecebea;
          --color-petal-pink: #FFDEEB;
          --color-mint-green: #D4F1F4;
          --color-canary-yellow: #FFE4D6;
          --color-soft-violet: #E8E3FD;
          --color-aqua: #E0F7FA;
          --pastel-violet: #E8E3FD;
          --pastel-mint: #D4F1F4;
          --pastel-canary: #FFE4D6;
          --pastel-peach: #FFE4D6;
          --pastel-pink: #FFDEEB;
          --pastel-aqua: #E0F7FA;
          --color-indigo-deep: #2e2460;
          --font-primary: 'Inter', ui-sans-serif, system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --radius-cards: 12px;
          --radius-buttons: 8px;
          --radius-inputs: 12px;
          --radius-badges: 9999px;
          --page-max-width: 1200px;
        }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background-color: var(--color-canvas-white); color: var(--color-ink); font-family: var(--font-primary); }
      `;
    }
  }
  return cachedCss;
}

const BRAND_SVG_ICON = `
<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="alumlyNavGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF9A76"/>
      <stop offset="100%" stop-color="#FF528B"/>
    </linearGradient>
  </defs>
  <!-- Bold Sans-Serif Capital Letter 'A' -->
  <path d="M8.5 26L14.2 11.5H17.8L23.5 26H20.2L18.6 21.5H13.4L11.8 26H8.5ZM14.3 18.5H17.7L16 13.8L14.3 18.5Z" fill="#FFFFFF"/>
  <!-- Graduation Cap (Mortarboard & Tassel) Tilted -13deg -->
  <g transform="rotate(-13 16 8.5)">
    <!-- Cap Under-Bevel / 3D Rim Layer -->
    <polygon points="16,13 25.5,8.5 24.5,9.6 16,14.1 7.5,9.6 6.5,8.5" fill="#D93B68"/>
    <!-- Mortarboard Diamond Top in Radiant Peach-to-Pink Gradient -->
    <polygon points="16,4 25.5,8.5 16,13 6.5,8.5" fill="url(#alumlyNavGrad)"/>
    <!-- Center Button Rivet -->
    <circle cx="16" cy="8.5" r="1.1" fill="#FFFFFF"/>
    <!-- Dangling Tassel Cord -->
    <path d="M16 8.5 C 11.5 8.5 7.8 9.2 7.2 11.2 C 6.8 12.8 7 14.8 7 16.5" stroke="#FF8FB3" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <!-- Tassel Brush Accent -->
    <rect x="5.8" y="16.5" width="2.4" height="3.2" rx="1.2" fill="#FF528B"/>
  </g>
</svg>
`;

function getBrandLogoHtml(title = "Alumly — Alumni & Career Network") {
  return `
    <a href="/" class="nav-logo" title="${title}">
      <span class="nav-logo-icon">
        ${BRAND_SVG_ICON}
      </span>
      <span class="nav-brand-text">Alumly</span>
    </a>
  `;
}

function getHeadTags(pageTitle) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <style>
    ${getGlobalStyles()}
  </style>
  `;
}

module.exports = {
  getGlobalStyles,
  getHeadTags,
  BRAND_SVG_ICON,
  getBrandLogoHtml
};
