# 🎨 Alumly — Master Design System (`design.md`)
> *Editorial Academic Authority meets Modern iOS Glassmorphism*

**System Name:** Alumly Design Language (ADL)  
**Theme:** iOS Glassmorphism on Seamless Ambient Gradient  
**Version:** 2.0.0  
**Status:** Canonical Design Reference  
**Cross-References:** [`brand.md`](./brand.md) · [`README.md`](./README.md) · [`AGENTS.md`](./AGENTS.md)

---

## 📑 Table of Contents
1. [Executive Summary & Design Philosophy](#1-executive-summary--design-philosophy)
2. [The Alumly Visual Architecture](#2-the-alumly-visual-architecture)
3. [Design Tokens — Color Palette & Gradients](#3-design-tokens--color-palette--gradients)
4. [Design Tokens — Typography & Weights](#4-design-tokens--typography--weights)
5. [Design Tokens — Geometry, Spacing & Elevation](#5-design-tokens--geometry-spacing--elevation)
6. [Component Patterns & UI Library](#6-component-patterns--ui-library)
7. [Universal Page Implementations](#7-universal-page-implementations)
8. [Do's and Don'ts Guide](#8-dos-and-donts-guide)
9. [CSS & Tailwind Production Tokens](#9-css--tailwind-production-tokens)

---

## 1. Executive Summary & Design Philosophy

**Alumly** is built on a simple premise: university alumni networks should feel like thoughtful, high-end editorial publications and sleek startup workbenches, rather than clunky enterprise databases.

We unite three foundational design paradigms into a single, cohesive design system:

1. **Seamless Ambient Canvas:** A fixed, full-viewport peach-to-pink ambient gradient (`#FF9A76` → `#FFFFFF` → `#FF528B`) that gives every page an inviting, contemporary warmth.
2. **iOS Glassmorphism Surfaces:** Multi-layer translucent cards, modal stages, and pill navigation containers crafted with `backdrop-filter: blur(16px - 20px)`, crisp translucent hairline borders (`1px solid rgba(255, 255, 255, 0.6 - 0.85)`), and **zero heavy drop-shadows** (`box-shadow: none !important;`).
3. **Editorial Typography & Single Dominant CTA Discipline:** Academic dignities rendered in classical editorial serif headers (`Source Serif 4`, `Lora`) paired with a high-contrast geometric UI sans (`Inter`) and high-intent Ink Black (`#16191c`) pill-shaped CTA buttons.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ALUMLY DESIGN SYSTEM ARCHITECTURE                    │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Visual Pillar     │ Core Trait        │ Alumly Production Standard     │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🌅 Ambient Wash   │ Peach-to-Pink     │ Fixed full-viewport gradient   │
│ 🪟 iOS Glass      │ Frosted Blur      │ 16-20px blur, 1px white border │
│ 🖋️ Editorial Serif │ Restrained Weight │ High-contrast academic gravity │
│ 🔘 Ink Black CTA  │ Pill Geometry     │ #16191c dominant action button │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## 2. The Alumly Visual Architecture

### 2.1 The Seamless Ambient Canvas
Instead of cold sterile grays or stark stark white pages, Alumly uses a fixed, non-scrolling ambient gradient that flows smoothly behind all content:
```css
body {
  background: linear-gradient(135deg, #FF9A76 0%, #FFCBA4 25%, #FFFFFF 50%, #FF8FB3 75%, #FF528B 100%);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--color-ink-black);
}
```

### 2.2 The iOS Glassmorphism Layer
Content does not float in opacity-less boxes. Every actionable surface is an elevated frosted glass container:
```css
.glass-card, .glass-form-card, .nav-pill-menu {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: none !important;
}
```

### 2.3 Strict Hairline Definition (No Muddy Shadows)
Depth and hierarchy are established exclusively through:
- Surface opacity shifts (`rgba(255, 255, 255, 0.40)` to `rgba(255, 255, 255, 0.75)`).
- Crisp `1px` translucent white borders (`rgba(255, 255, 255, 0.60)` to `rgba(255, 255, 255, 0.85)`).
- Complete exclusion of fuzzy, muddy CSS drop-shadows.

---

## 3. Design Tokens — Color Palette & Gradients

### 🎨 Master Color Tokens

| Token Name | Hex / Value | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Ink Black** | `#16191c` | `--color-ink-black` | Primary text, display headings, logo box, primary CTA background |
| **Ink Black Hover** | `#2c3137` | `--color-primary-cta-hover` | Hover state for primary buttons |
| **Canvas White** | `#ffffff` | `--color-surface-white` | Pure white elements, icons, dark footer typography |
| **Muted Slate** | `#64686e` | `--color-slate-body` | Secondary body text, form helper texts, subtitle copy |
| **Dark Slate** | `#4d5358` | `--color-slate-dark` | Eyebrow badges, metadata labels, class years |
| **Fog Border** | `#d1d4d9` | `--color-fog-border` | Subtle hairline dividers, neutral table borders |
| **Glass Light Border** | `rgba(255, 255, 255, 0.60)` | `--color-fog-border-light` | Hairline border for frosted glass cards and pills |
| **Ambient Peach** | `#FF9A76` | `--ambient-peach` | Starting node for global background gradient |
| **Ambient Pink** | `#FF528B` | `--ambient-pink` | Ending node for global background gradient |
| **Dark Footer Base** | `rgba(22, 25, 28, 0.95)`| `--footer-bg` | Architectural dark base for global footer |

### 🚦 Semantic & Status Colors

| State | Foreground | Surface Tint | Border Tint | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `#16a34a` | `#f0fdf4` | `#bbf7d0` | `Accepted` application status, save confirmation |
| **Warning** | `#d97706` | `#fffbeb` | `#fde68a` | `Reviewing` status, pending profile actions |
| **Danger** | `#dc2626` | `#fef2f2` | `#fee2e2` | `Rejected` application status, delete confirmations |
| **Info / Telemetry** | `#0284c7` | `#f0f9ff` | `#bae6fd` | Route tags, telemetry pills, active filters |

---

## 4. Design Tokens — Typography & Weights

Alumly pairs classical academic serif titles with modern high-density UI sans and monospace tracking tags:

```css
/* Tier 1: Editorial Display & Headings */
--font-serif: 'Source Serif 4', Georgia, serif;

/* Tier 2: Interface, Forms, Navigation, Body */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Tier 3: Eyebrows, Badges, Identifiers */
--font-mono: 'JetBrains Mono', Menlo, monospace;
```

### 📏 Typographic Scale

| Token | Size | Weight | Tracking | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | `3.50rem` (`56px`) | `400` / `600` (`strong`) | `-0.025em` | Main landing headline (*Your Modern Alumni Network*) |
| **Page Title (`h1`)** | `2.25rem` (`36px`) | `600` | `-0.020em` | Sub-page headers (*Alumni Directory*, *Job Board*) |
| **Section Title (`h2`)** | `1.45rem` (`23px`) | `600` | `-0.015em` | Form card headers, table section titles |
| **Card Title (`h3`)** | `1.15rem` (`18px`) | `600` | `-0.010em` | User names, job posting titles, bulletin names |
| **Body Base** | `0.95rem` (`15px`) | `400` | Normal | Narrative copy, descriptions, details |
| **Form Helper / Hint** | `0.75rem` (`12px`) | `400` | `+0.010em` | Subtle captions beneath inputs (*"Link to PDF resume..."*) |
| **Mono Eyebrow** | `0.75rem` (`12px`) | `600` | `+0.080em` | Uppercase eyebrow badges (*● ALUMNI DIRECTORY*) |

---

## 5. Design Tokens — Geometry, Spacing & Elevation

### 🔘 Radii Specification
- **Pill Buttons & Nav Pills:** `100px` (`--radius-pill`)
- **Status Badges & Eyebrows:** `9999px` (`--radius-badge`)
- **Form Controls (Inputs/Selects/Textareas):** `16px` (`border-radius: 16px;`)
- **Glass Cards & Form Stages:** `16px` (`--radius-card`)
- **Logo Icon Square:** `10px` (`36px × 36px` icon box)

### 📐 Spacing Scale
- `8px` (`--space-2`): Badge padding, icon gaps.
- `12px` (`--space-3`): Input inner padding Y, button gap.
- `16px` (`--space-4`): Card inner padding Y on mobile, form field spacing.
- `24px` (`--space-6`): Gutter spacing, container horizontal padding.
- `32px` (`--space-8`): Top header padding X, card interior padding.
- `64px` (`--space-16`): Bottom section clearance.
- `88px` (`--section-gap`): Major landing section spacing.

---

## 6. Component Patterns & UI Library

### 6.1 Unified 3-Column CSS Grid Header
Every user-facing page features the exact same full-width 3-column navigation grid:
```css
.top-nav {
  position: relative;
  z-index: 100;
  width: 100%;
  max-width: 100%;
  padding: 16px 32px;
  background: transparent;
  box-sizing: border-box;
}

.nav-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.nav-logo { justify-self: start; }
.nav-pill-menu { justify-self: center; }
.nav-actions { justify-self: end; }
```
- **Left Column (`1fr`):** Alumly brand mark (`36px` Ink Black icon container + graduation cap vector + wordmark).
- **Center Column (`auto`):** Floating frosted-glass pill menu (`rgba(255, 255, 255, 0.4)`, `blur(16px)`, `border-radius: 100px`).
- **Right Column (`1fr`):** Contextual single action CTA or empty spacer container (`<div class="nav-actions"></div>`) to mathematically lock the floating pill in the dead-center.

### 6.2 Single Dominant CTA Discipline (`.btn-primary`)
Each viewport presents exactly one primary action button:
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #16191c;
  color: #ffffff !important;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 100px;
  border: 1px solid #16191c;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-primary:hover {
  background-color: #2c3137;
  border-color: #2c3137;
}
```

### 6.3 Rounded iOS Glassmorphism Form Controls
All inputs, select dropdowns, and textareas across the platform share our generous rounded treatment:
```css
.form-control, input[type="text"], input[type="email"], select, textarea {
  width: 100%;
  padding: 12px 18px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-ink-black);
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  outline: none;
  transition: all 0.15s ease;
}
.form-control:focus {
  background: rgba(255, 255, 255, 0.90);
  border-color: var(--color-ink-black);
}

/* Muted 12px Form Helper Caption */
.form-text, .form-hint, .field-desc {
  font-size: 0.75rem; /* 12px */
  color: #64686e;
  margin-top: 5px;
  line-height: 1.4;
  font-weight: 400;
}
```

---

## 7. Universal Page Implementations

Every view across Alumly strictly enforces this design system:

| Page Route | Purpose | Key UI Modules |
| :--- | :--- | :--- |
| **`/` (Home)** | Platform Showcase | Hero section with punchy headline (*Your Modern Alumni Network*), centered pill menu, feature cards, and dark footer with elevated white branding. |
| **`/users`** | Alumni Directory & Users | Full-width centered header, verified member count, "+ Create New User" frosted form with single submit button (`+ Create User Record`), and directory cards. |
| **`/users/:id`** | Member Dossier Profile | Glass profile card, academic department tags, graduation year, verified contact details, back-to-directory glass button. |
| **`/jobs`** | Career Opportunities Board | Centered header with single `+ Post Job` button, horizontal glass stats grid (Total Postings, Active Postings), search/filter form, and interactive job cards. |
| **`/jobs/:id`** | Job Detail & Application | Header with empty right column (preserving centered nav), polished actions (`← Back`, `Edit`, `Delete`), job specifications, and iOS glassmorphism application form with 12px helper captions. |
| **`/jobs/new`** | Job Publishing Stage | Frosted submission container, salary and remote type dropdowns, and single publish action. |
| **`/applications`** | ATS Candidate Lifecycle | Application pipeline stage cards, candidate resume download pills, and instant status mutation controls. |
| **`/announcements`** | Institutional Bulletins | News stream, priority event tags, date stamps, and glass bulletin publisher card. |
| **`/about`** | Platform Architecture | Unified 3-column header, architectural overview, tech stack highlights, and API integration capabilities. |
| **`/404` & `/500`** | Defensive Error Guardians | Frosted error stage with clear status codes, helpful recovery links, and zero raw stack trace leakage. |

---

## 8. Do's and Don'ts Guide

### ✅ Do
- **Do** keep the 3-column grid header intact with `<div class="nav-actions"></div>` on pages without a right-side button so the frosted pill stays mathematically centered.
- **Do** wrap primary CTA buttons in `.btn-primary` with Ink Black (`#16191c`) and `100px` pill radius.
- **Do** style all form helper texts in subtle `12px` muted slate (`#64686e`) so they function as discreet captions.
- **Do** ensure the Alumly wordmark inside the dark footer is pure crisp white (`#ffffff`) with an elevated translucent icon container.

### ❌ Don't
- **Don't** add CSS `box-shadow` or muddy drop-shadows; elevation is achieved through frosted glass layering and hairline borders.
- **Don't** reintroduce developer or backend jargon into user-facing copy (no raw routes like `(POST /users)` or database names like `(alumni_db)`).
- **Don't** clutter headers with multiple competing CTA buttons; enforce single dominant CTA discipline.
- **Don't** use sharp rectangular corners for form inputs; keep them generously rounded at `16px`.

---

## 9. CSS & Tailwind Production Tokens

```css
:root {
  /* Surface & Brand Tokens */
  --color-primary-cta: #16191c;
  --color-primary-cta-hover: #2c3137;
  --color-ink-black: #16191c;
  --color-slate-body: #64686e;
  --color-slate-dark: #4d5358;
  --color-fog-border: #d1d4d9;
  --color-surface-white: #ffffff;

  /* Ambient Gradient */
  --ambient-peach: #FF9A76;
  --ambient-pink: #FF528B;

  /* Geometry & Radius */
  --radius-card: 16px;
  --radius-pill: 100px;
  --radius-badge: 9999px;
  --radius-input: 16px;

  /* Typography */
  --font-serif: 'Source Serif 4', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', Menlo, monospace;
}
```

---

> 🔗 **Related Documentation:**
> - [Brand Guidelines (`brand.md`)](./brand.md)
> - [Master README (`README.md`)](./README.md)
> - [Agent & Workflow Automation (`AGENTS.md`)](./AGENTS.md)
