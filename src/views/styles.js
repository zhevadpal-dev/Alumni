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
          --color-canvas-paper: #f9fafb;
          --color-surface-white: #ffffff;
          --color-stone: #d1d4d9;
          --color-ink: #16191c;
          --color-primary-teal: #1c5d5f;
          --color-primary-teal-hover: #164a4c;
          --font-editorial: 'Source Serif 4', 'Lora', Georgia, serif;
          --font-sans: 'Inter', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --radius-card: 12px;
          --radius-pill: 48px;
          --page-max-width: 1200px;
        }
        *, *::before, *::after { box-sizing: border-box; box-shadow: none !important; }
        body { margin: 0; background-color: var(--color-canvas-paper); color: var(--color-ink); font-family: var(--font-sans); }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
        h1, .display-title { font-family: var(--font-editorial); font-weight: 400; color: var(--color-ink); }
        .card, .stat-card, .module-card, .job-card { background: #ffffff; border: 1px solid var(--color-stone) !important; border-radius: 12px !important; box-shadow: none !important; padding: 32px !important; }
        .btn-primary, .hero-btn-primary, input[type="submit"] { background-color: var(--color-primary-teal) !important; border-radius: 48px !important; color: #ffffff !important; border: 1px solid var(--color-primary-teal) !important; padding: 12px 28px !important; }
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
