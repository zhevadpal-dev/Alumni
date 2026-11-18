# 🎨 Alumly — Brand Guidelines & Identity Framework

> **Platform:** Alumly  
> **Tagline:** Your Modern Alumni Network  
> **Version:** 2.0.0  
> **Status:** Official Brand Identity Specification  
> **Master Design System & UI Specification:** [`design.md`](./design.md)  
> **Anchor in Master Documentation:** [`README.md#brand-identity`](./README.md#brand-identity)

---

## 📑 Table of Contents
1. [Brand Essence & Overview](#1-brand-essence--overview)
2. [Voice, Tone & Messaging Framework](#2-voice-tone--messaging-framework)
3. [Logo, Monogram & Favicon Specification](#3-logo-monogram--favicon-specification)
4. [Color System & Design Tokens](#4-color-system--design-tokens)
5. [Typography Hierarchy](#5-typography-hierarchy)
6. [Visual Language & Component Standards](#6-visual-language--component-standards)
7. [Accessibility & Contrast Principles](#7-accessibility--contrast-principles)
8. [Live Platform Reference Links](#8-live-platform-reference-links)

---

## 1. Brand Essence & Overview

**Alumly** is a high-performance, editorial career network and relational directory connecting higher education institutions, distinguished graduates, active students, and leading employer partners.

### 🌟 Core Mission
To transform traditional, fragmented university alumni tracking into an elegant, unified, and intuitive network where graduates advance their careers, students discover vetted opportunities, and universities maintain lifelong connections with their global alumni body.

### 🏛️ Brand Pillars
- **Academic Prestige & Dignity:** Balancing institutional heritage with modern Silicon Valley product craftsmanship.
- **Career Mobility & Opportunity:** Transparent, high-velocity job sharing, internship placement, and application lifecycle tracking.
- **Community & Meaningful Connection:** Direct networking between experienced graduates, faculty, and ambitious students.
- **Editorial Simplicity:** Clean, distraction-free product surfaces built on iOS glassmorphism and weight-restrained typography, entirely free of developer jargon.

---

## 2. Voice, Tone & Messaging Framework

Alumly speaks with clarity, warmth, and quiet confidence. We communicate like a modern editorial SaaS product (inspired by Linear, Amplemarket, and Raycast)—not like a technical database demo or legacy administrative portal.

### 🎯 Tone Attributes

| Attribute | Character | Translation in Copy & UI |
| :--- | :--- | :--- |
| **Editorial & Elevated** | Literate, composed, precise | *"Your Modern Alumni Network"*, *"An Integrated Suite for Academic Communities"*. |
| **Startup-Grade & Crisp** | Action-oriented, concise | *"Browse Members →"*, *"+ Create User Record"*, *"Publish Job Opportunity"*. |
| **Jargon-Free** | User-facing, natural | No parenthetical backend jargon (no raw routes like `(POST /users)`, database names `(alumni_db)`, or internal schema IDs). |
| **Reassuring & Helpful** | Clear guidance, polite errors | Soft `12px` input captions (*"Link to PDF resume, GitHub profile, or personal website."*) and graceful, structured 404/5xx fallback views. |

### 📢 Official Copy Guidelines
- **Primary Headline:** *"Your Modern Alumni Network"*
- **Secondary Descriptor:** *"Connect graduates with premier career opportunities, track application lifecycles, and empower academic institutions with an editorial, high-performance career network."*
- **Features Eyebrow:** `● PLATFORM FEATURES` / `● ALUMNI DIRECTORY` / `● CAREER NETWORK`

---

## 3. Logo, Monogram & Favicon Specification

The official **Alumly** brand mark combines academic heritage with clean geometric vector precision. It features a bold capital letter **"A"** crowned by a tilted graduation cap (mortarboard) with an expressive peach-to-pink gradient top and dangling tassel.

```
┌───────────────────────────────┐
│   ■ Ink Black (#16191c) Box   │
│   ┌───────────────┐           │
│   │ 🎓 Tilted Cap │ (-13°)    │
│   │   ▲           │           │
│   │  / \ Bold "A" │ (White)   │
│   │ /---\         │           │
│   └───────────────┘           │
└───────────────────────────────┘
```

### 📐 Geometry & Vectors
1. **Container:**
   - **Form:** Symmetrical rounded square (`border-radius: 10px` on `36px × 36px` icon box, `8px` on `32px × 32px`).
   - **Light Surface (Header):** Solid Ink Black (`#16191c`).
   - **Dark Surface (Footer):** Translucent elevated container (`background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 8px;`).
2. **Capital Letter "A":**
   - Solid pure white (`#FFFFFF`) bold sans-serif capital letter **"A"** centered in the lower-middle portion (`d="M8.5 26L14.2 11.5H17.8L23.5 26H20.2L18.6 21.5H13.4L11.8 26H8.5ZM14.3 18.5H17.7L16 13.8L14.3 18.5Z"`).
3. **Graduation Cap (Mortarboard & Tassel):**
   - **Rotation:** Scaled and tilted at **`-13deg`** (`transform="rotate(-13 16 8.5)"`).
   - **Diamond Top:** Filled with radiant Peach-to-Pink gradient (`linearGradient` from `#FF9A76` at 0% to `#FF528B` at 100%).
   - **Under-Bevel / 3D Rim:** Sculpted shadow rim in deep crimson (`#D93B68`).
   - **Center Rivet:** Pure white circle (`#FFFFFF`, radius `1.1px`).
   - **Tassel Cord:** Fluid curving path in petal pink (`#FF8FB3`, stroke width `1.2px`).
   - **Tassel Brush:** Rounded accent pill in vivid pink (`#FF528B`).
4. **Brand Wordmark:**
   - **Font:** `Inter`, 700 bold weight, `-0.03em` tracking.
   - **Header Wordmark:** Ink Black (`#16191c`).
   - **Footer Wordmark:** Crisp pure white (`#FFFFFF`).
5. **Favicon:**
   - Standalone SVG file deployed at [`/favicon.svg`](./public/favicon.svg) utilizing the exact same vector paths and gradients for sharp retina display in all browsers.

---

## 4. Color System & Design Tokens

The Alumly visual identity is built on a seamless ambient peach-to-pink gradient, deep ink black interactive anchors, and frosted glass translucent surfaces.

### 🎨 Primary & Ambient Palette

| Token Name | Value | Role & Usage |
| :--- | :--- | :--- |
| **Ink Black** | `#16191c` | Primary brand color, primary typography, pill CTA buttons, nav logo box |
| **Ink Black Hover** | `#26292d` | Hover state for primary pill CTA buttons |
| **Ambient Peach** | `#FFE4D6` (`#FF9A76`) | Gradient start hue for page canvas, hero glow, and brand vectors |
| **Ambient Pink** | `#FFDEEB` (`#FF528B`) | Gradient end hue for page canvas, hero glow, and brand vectors |
| **Pure White** | `#FFFFFF` | Form card backgrounds, vector highlights, dark-footer text |
| **Muted Slate** | `#64686e` / `#4a4a4c` | Secondary captions, form hint texts, subtitle copy, breadcrumbs |
| **Glass Surface** | `rgba(255, 255, 255, 0.45 - 0.70)` | Frosted-glass containers, profile cards, pill navigation bar |
| **Glass Hairline** | `rgba(255, 255, 255, 0.60 - 0.85)` | 1px crisp translucent borders on all glass cards and controls |
| **Dark Footer** | `rgba(22, 25, 28, 0.95)` | Grounded architectural base for site-wide footer |

### 🚦 Semantic Badge Palette

| Module / Status | Foreground | Background Tint | Border Tint | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Alumni Directory** | `#16191c` | `rgba(255, 255, 255, 0.6)` | `rgba(255, 255, 255, 0.8)` | Directory badges, member counts |
| **Career Opportunities**| `#16191c` | `rgba(255, 255, 255, 0.6)` | `rgba(255, 255, 255, 0.8)` | Job type pills, board header badge |
| **Application Success** | `#16a34a` | `#f0fdf4` | `#bbf7d0` | `Accepted` candidate applications |
| **Under Review** | `#d97706` | `#fffbeb` | `#fde68a` | `Reviewing` / `Pending` applications |
| **Application Rejected**| `#dc2626` | `#fef2f2` | `#fee2e2` | `Rejected` candidate applications |

---

## 5. Typography Hierarchy

Alumly pairs a high-contrast editorial serif for academic dignity with a clean geometric sans-serif for UI density, completed by monospace category badges.

```css
/* Display & Headlines */
font-family: 'Source Serif 4', 'Lora', Georgia, serif;

/* UI, Navigation, Forms, Body */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Eyebrows, Badges, Identifiers */
font-family: 'JetBrains Mono', ui-monospace, Menlo, Monaco, monospace;
```

### 📏 Typographic Scale

| Element | Font Family | Size | Weight | Tracking | Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | Editorial Serif | `3.25rem - 3.75rem` | `400` / `600` (`strong`) | `-0.025em` | `#16191c` |
| **Page Title (`h1`)** | Editorial Serif | `2.25rem` | `600` | `-0.02em` | `#16191c` |
| **Section Title (`h2`)** | Editorial Serif | `1.45rem - 1.75rem`| `600` | `-0.015em` | `#16191c` |
| **Card Title (`h3`)** | UI Sans | `1.15rem` | `600` | `-0.01em` | `#16191c` |
| **Body Text** | UI Sans | `0.95rem - 1.0rem` | `400` | Normal | `#272625` |
| **Secondary Copy** | UI Sans | `0.90rem - 0.95rem`| `400` | Normal | `#4a4a4c` |
| **Form Helper / Hint** | UI Sans | `0.75rem` (`12px`) | `400` | `+0.01em` | `#64686e` |
| **Eyebrows & Badges** | Monospace | `0.75rem` | `600` | `+0.08em` | `#16191c` |

---

## 6. Visual Language & Component Standards

### 🪟 iOS Glassmorphism Surfaces
Every card, form container, modal, and navigation bar utilizes our translucent frosted-glass treatment:
- **Surface Fill:** `rgba(255, 255, 255, 0.45)` to `rgba(255, 255, 255, 0.70)`
- **Backdrop Filter:** `blur(16px)` to `blur(20px)` with `-webkit-backdrop-filter`
- **Border:** `1px solid rgba(255, 255, 255, 0.60)` to `rgba(255, 255, 255, 0.85)`
- **Corner Radii:** `16px` for cards and form containers; `100px` for pills and buttons.
- **Shadows:** No muddy, heavy drop shadows; depth is achieved strictly through crisp white hairline borders and luminous frosted layering.

### 🔘 Ink Black Pill CTAs (`.btn-primary`)
Primary conversion actions use our high-contrast pill button:
- `background-color: #16191c; color: #ffffff !important;`
- `border-radius: 100px; padding: 12px 28px;`
- `font-size: 0.95rem; font-weight: 600;`
- Clean lift on hover (`background-color: #26292d`).

### 🧭 3-Column Symmetrical Navigation Header
All pages enforce a full-width 3-column CSS Grid header:
- `display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 16px 32px;`
- **Left Column (`1fr`):** Alumly Logo + Wordmark (`justify-self: start`).
- **Center Column (`auto`):** Floating frosted-glass pill menu (`justify-self: center`).
- **Right Column (`1fr`):** Single action CTA button or empty balancing spacer (`<div class="nav-actions"></div>`, `justify-self: end`).

### 📝 Rounded Form Controls
Inputs, selects, and textareas feature generous `16px` radii, soft frosted surfaces, and subtle `12px` helper text to create an effortless iOS-grade submission flow.

---

## 7. Accessibility & Contrast Principles

1. **WCAG 2.1 AA Compliance:** All primary text colors (`#16191c`, `#ffffff`) meet or exceed standard 4.5:1 contrast ratios on their respective surfaces.
2. **Accessible Semantics:** Icons and decorative vector gradients carry `aria-hidden="true"`, with meaningful labels provided on all interactive controls.
3. **No Raw Unstyled Flashes:** Critical view styling and fonts are loaded synchronously to eliminate cumulative layout shifts (CLS).

---

## 8. Live Platform Reference Links

- **Home Experience:** [`http://localhost:5001/`](http://localhost:5001/)
- **Alumni Directory:** [`http://localhost:5001/users`](http://localhost:5001/users)
- **Job Board:** [`http://localhost:5001/jobs`](http://localhost:5001/jobs)
- **Applications Tracking:** [`http://localhost:5001/applications`](http://localhost:5001/applications)
- **Announcements & Bulletins:** [`http://localhost:5001/announcements`](http://localhost:5001/announcements)
- **About Alumly Platform:** [`http://localhost:5001/about`](http://localhost:5001/about)
- **Interactive Swagger Docs:** [`http://localhost:5001/api/swagger`](http://localhost:5001/api/swagger)

---

> 🔗 **Related Documentation:**
> - [Master Design System (`design.md`)](./design.md)
> - [Master README (`README.md`)](./README.md)
> - [Agent & Workflow Automation (`AGENTS.md`)](./AGENTS.md)
