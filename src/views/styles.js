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
  <!-- Primary Geometric Form: Sculpted Pure White Arch -->
  <path d="M7 24.5C7.2 15.2 10.8 6.5 16 6.5C19.5 6.5 22.2 9 21.8 13.8C21.5 15.5 19.8 16.2 18.5 14.8C19.2 12.2 18 10.2 16 10.2C12.8 10.2 11.2 15.8 11 24.5C10.9 25.3 10.2 26 9.4 26H8.6C7.7 26 7 25.3 7 24.5Z" fill="#FFFFFF"/>
  <!-- Overlapping Accent Form: Radiant Peach-to-Pink Ribbon -->
  <path d="M25 24.5C24.8 17.8 21.5 12.8 17 12.8C13.2 12.8 9.5 15.5 8 16.8C7.2 17.5 7.5 18.8 8.5 18.8C9.5 18.8 11.8 17.5 15 16.2C18 15 20.2 15.8 21 18.8C21.6 20.2 21.6 22.5 21.6 24.5C21.6 25.3 22.3 26 23.1 26H23.9C24.7 26 25 25.3 25 24.5Z" fill="url(#alumlyNavGrad)"/>
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
