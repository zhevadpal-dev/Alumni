/**
 * Alumni Tracking System — Shared View Styles Helper
 * Canonical Implementation of design.md
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
      // Fallback in case of path differences
      cachedCss = `
        :root {
          --color-canvas-white: #ffffff;
          --color-parchment-cream: #f7f6f2;
          --color-stone: #d1d4d9;
          --color-ink: #111111;
          --color-ash: #6d6c6b;
          --color-primary-teal: #1c5d5f;
          --color-primary-teal-hover: #164a4c;
          --color-soft-violet: #e2ddfd;
          --color-mint-green: #b7efb2;
          --color-canary-yellow: #ffef99;
          --color-petal-pink: #ffd7f0;
          --color-aqua: #99fff9;
          --font-editorial: 'Source Serif 4', 'P22 Mackinac Pro', Georgia, serif;
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
          --radius-pill: 48px;
        }
        *, *::before, *::after { box-sizing: border-box; box-shadow: none !important; }
        body { margin: 0; background-color: var(--color-parchment-cream); color: var(--color-ink); font-family: var(--font-sans); }
        h1, h2, h3, .title, .section-title { font-family: var(--font-editorial); font-weight: 400; color: var(--color-ink); }
        .card, .stat-card, .module-card, .job-card, .bench-hero { background: #ffffff; border: 1px solid var(--color-stone) !important; border-radius: 12px; box-shadow: none !important; }
        .btn-primary, .hero-btn-primary, input[type="submit"] { background-color: var(--color-primary-teal) !important; border-radius: 48px !important; color: #ffffff !important; border: 1px solid var(--color-primary-teal) !important; padding: 10px 24px !important; }
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet">
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
