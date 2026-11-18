/**
 * Alumni Tracking System — Shared View Styles Helper
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

function getHeadTags(pageTitle) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
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
  getHeadTags
};
