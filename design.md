# 🎨 Alumni Tracking System — Master Design System (`design.md`)
> *Academic Heritage meets Modern Product Workbench*

**System Name:** Alumni Tracking System (ATS) Design Language  
**Theme:** Light (Editorial Warm Canvas with Pastel Taxonomy)  
**Version:** 2.0.0  
**Status:** Canonical Design Reference  
**Cross-References:** [`brand.md`](brand.md) · [`README.md`](README.md) · [`AGENTS.md`](AGENTS.md)

---

## 📑 Table of Contents
1. [Executive Summary & Design Philosophy](#1-executive-summary--design-philosophy)
2. [The 4-Pillar Synthesis Architecture](#2-the-4-pillar-synthesis-architecture)
3. [Design Tokens — Color Palette](#3-design-tokens--color-palette)
4. [Design Tokens — Typography](#4-design-tokens--typography)
5. [Design Tokens — Spacing, Radii & Surface Elevation](#5-design-tokens--spacing-radii--surface-elevation)
6. [Component Patterns & UI Library](#6-component-patterns--ui-library)
7. [HTML & CSS Component Recipes](#7-html--css-component-recipes)
8. [Do's and Don'ts Guide](#8-dos-and-donts-guide)
9. [Production Token Implementations (CSS & Tailwind v4)](#9-production-token-implementations-css--tailwind-v4)

---

## 1. Executive Summary & Design Philosophy

The **Alumni Tracking System** serves higher education institutions, distinguished graduates, active students, and recruiting partners. It must satisfy two demanding user expectations simultaneously:

1. **Academic Dignity & Editorial Authority:** University alumni networks, graduation records, and institutional communications demand typographic gravity, warmth, and prestige.
2. **High-Velocity Product Workbench:** Job boards, applicant tracking (ATS), career pipelines, and API telemetry demand dense, readable, flat, and distraction-free operational tools.

To resolve this duality, our design system synthesizes the best principles of four leading modern design languages into a single cohesive framework:

- **Amplemarket:** Multi-hue pastel category taxonomy (pastel card washes) and weight-restrained display typography.
- **User Interviews:** Editorial serif headers for academic gravitas paired with monospace eyebrow labels and high-contrast UI sans.
- **Hashnode:** Clean hairline border architecture (flat surfaces without muddy shadows) and single dominant CTA discipline.
- **Alden:** Two-tone canvas layering (crisp Paper White elements against warm Parchment Cream) with inline headline annotations.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ALUMNI TRACKING SYSTEM DESIGN SYNTHESIS               │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Source Style      │ Core Trait        │ ATS Implementation             │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ 🌸 Amplemarket    │ Pastel Taxonomy   │ Color-coded portal domains     │
│ 🎓 User Interviews│ Editorial Serif   │ Academic headers & mono tags   │
│ ⚡ Hashnode       │ Hairline Borders  │ 1px crisp separation, 1 CTA    │
│ 📜 Alden          │ Two-Tone Canvas   │ Cream canvas + word highlights │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## 2. The 4-Pillar Synthesis Architecture

### Pillar 1: Pastel Domain Taxonomy (Amplemarket)
Instead of arbitrary decorative illustrations, flat pastel colors are used systematically as section and card surfaces to establish an immediate mental model for the platform's core functional areas:
- **Soft Violet (`#e2ddfd`):** Alumni Profiles, Directory & Graduate Records.
- **Mint Green (`#b7efb2`):** Job Board, Career Opportunities & Internships.
- **Canary Yellow (`#ffef99`):** Applicant Tracking System (ATS), Mentorship & Review.
- **Petal Pink (`#ffd7f0`):** Institutional Announcements, Reunions & Events.
- **Aqua (`#99fff9`):** System Health, API Workbench, Telemetry & Developer Tools.

### Pillar 2: Academic Serif + Product Sans + Mono Tagging (User Interviews)
We pair a classical high-contrast serif font (`Source Serif 4` / `P22 Mackinac Pro`) for display titles with a geometric sans (`Inter` / `Labil Grotesk`) for UI controls, inputs, and tables. Technical metadata, status pills, and eyebrow categories are anchored by monospace uppercase labels with colored prefix dots (`● ALUMNI-PORTAL`).

### Pillar 3: Hairline Border Architecture & Single CTA Discipline (Hashnode)
We avoid heavy, muddy drop shadows. Depth and hierarchy are achieved through crisp 1px borders (`#d1d4d9` / `#e2e8f0`) and subtle tonal shifts. Every viewport enforces **Single Dominant CTA Discipline**: exactly one primary high-contrast button guides the user to the core conversion goal, preventing visual fatigue.

### Pillar 4: Two-Tone Canvas Layering & Word Highlights (Alden)
The main canvas background is a soft **Parchment Cream (`#f7f6f2`)**, while actionable cards, dossier stages, and modals are rendered in **Paper White (`#ffffff`)**. Key words in large headlines are softly annotated using **Sky Highlight (`#97cde5`)** or **Phoenix Orange** for editorial warmth.

---

## 3. Design Tokens — Color Palette

### 🎨 Master Color Specification Table

| Name | Hex / Value | CSS Variable | Tailwind v4 Token | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Ink** | `#111111` | `--color-ink` | `ink` | Primary text, display headings, filled primary CTA buttons |
| **Charcoal** | `#272625` | `--color-charcoal` | `charcoal` | Secondary dark surface, dark telemetry panels, footer background |
| **Midnight Indigo** | `#10054d` | `--color-midnight-indigo` | `midnight-indigo` | Deep institutional brand accent, academic badge headers |
| **Canvas White** | `#ffffff` | `--color-canvas-white` | `canvas-white` | Card surfaces, modal containers, input backgrounds |
| **Parchment Cream** | `#f7f6f2` | `--color-parchment-cream` | `parchment-cream` | Main page canvas wash, editorial background layer |
| **Cream Wash** | `#ecebea` | `--color-cream-wash` | `cream-wash` | Secondary card fills, subtle button backgrounds, hover fills |
| **Ash** | `#6d6c6b` | `--color-ash` | `ash` | Muted body copy, timestamps, secondary helper text |
| **Stone (Border)** | `#d1d4d9` | `--color-stone` | `stone` | Hairline card borders, table dividers, subtle input borders |
| **Phoenix Orange** | `#e8400d` | `--color-phoenix-orange` | `phoenix-orange` | Brand accent, hero button pulse, marketing gradient origin |
| **Sky Highlight** | `#97cde5` | `--color-sky-highlight` | `sky-highlight` | Inline editorial word annotations, text marker highlight |
| **Soft Violet** | `#e2ddfd` | `--color-soft-violet` | `soft-violet` | **Taxonomy:** Alumni Directory & Graduate Profiles |
| **Mint Green** | `#b7efb2` | `--color-mint-green` | `mint-green` | **Taxonomy:** Job Board & Career Opportunities |
| **Canary Yellow** | `#ffef99` | `--color-canary-yellow` | `canary-yellow` | **Taxonomy:** ATS Applications & Mentorship Matching |
| **Petal Pink** | `#ffd7f0` | `--color-petal-pink` | `petal-pink` | **Taxonomy:** Announcements, Reunions & Institutional Events |
| **Aqua** | `#99fff9` | `--color-aqua` | `aqua` | **Taxonomy:** Telemetry, API Workbench & Developer Tools |

### 🚦 Semantic Status Tokens

| State | Foreground Hex | Surface Tint | Border Tint | Application |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `#16a34a` (Emerald) | `#f0fdf4` | `#bbf7d0` | `Accepted` application status, `200 OK`, live DB connection |
| **Warning** | `#d97706` (Amber) | `#fffbeb` | `#fde68a` | `Under Review` status, pending profile approval, draft postings |
| **Danger / Error** | `#dc2626` (Crimson) | `#fef2f2` | `#fee2e2` | `Rejected` status, `404 Guardian`, `500 Server Error`, deletion alerts |
| **Info / Telemetry** | `#0284c7` (Sky) | `#f0f9ff` | `#bae6fd` | HTTP route badges, system logs, verified alumni checkmarks |

---

## 4. Design Tokens — Typography

Our typographic system utilizes a **three-tier font pairing** to balance institutional gravitas, clean data readability, and technical precision.

### 🔤 Font Families

```css
/* Tier 1: Editorial Display & Headings (Academic Authority) */
--font-editorial: "Source Serif 4", "P22 Mackinac Pro", Georgia, serif;

/* Tier 2: Product & Interface (Clean Clarity) */
--font-sans: "Inter", "Labil Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Tier 3: Technical & Telemetry (Data, Eyebrows & Code) */
--font-mono: "JetBrains Mono", "IBM Plex Mono", SFMono-Regular, Menlo, monospace;
```

### 📐 Typographic Scale & Restrained Weight Hierarchy

Following the **Amplemarket & Alden** philosophy, large display headlines employ **weight 400 (Regular)** for a calm, editorial feel rather than aggressive ultra-bold type. Ultra-heavy weight (900) is strictly reserved for poster-style uppercase hero banners.

| Token | Size | Line Height | Letter Spacing | Weight | Font Tier | Primary Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-poster` | `84px` (`5.25rem`) | `0.95` | `-0.055em` | `900` | Sans (Uppercase) | Hero poster splash banners |
| `display-hero` | `56px` (`3.50rem`) | `1.05` | `-0.045em` | `400` | Editorial Serif | Main landing page headline |
| `display-section`| `40px` (`2.50rem`) | `1.15` | `-0.035em` | `400` | Editorial Serif | Major section headers, portal gateways |
| `title-lg` | `28px` (`1.75rem`) | `1.25` | `-0.025em` | `600` | Editorial Serif | Card category headers, view titles |
| `title-md` | `20px` (`1.25rem`) | `1.30` | `-0.015em` | `600` | Sans | Modal titles, job titles, profile names |
| `body-base` | `16px` (`1.00rem`) | `1.55` | `0` | `400` | Sans | Primary body text, descriptions, essays |
| `body-sm` | `14px` (`0.875rem`)| `1.45` | `0` | `400 / 500` | Sans | Table cells, helper text, form labels |
| `mono-eyebrow` | `12px` (`0.75rem`) | `1.00` | `+0.080em` | `600` | Mono (Uppercase) | Section eyebrow badges, status tags |
| `mono-code` | `13px` (`0.8125rem`)| `1.40` | `0` | `500` | Mono | API routes, SQL schemas, terminal logs |

---

## 5. Design Tokens — Spacing, Radii & Surface Elevation

### 📏 Spacing Scale (4px Base Grid)

```
--space-1:  4px;    /* Compact tag padding, inline icons */
--space-2:  8px;    /* Button padding Y, badge spacing */
--space-3: 12px;    /* Form gap, tight card padding */
--space-4: 16px;    /* Standard card padding, input padding X */
--space-6: 24px;    /* Section gutter, grid gap */
--space-8: 32px;    /* Container spacing, hero card padding */
--space-12: 48px;   /* Major section vertical rhythm */
--space-16: 64px;   /* Landing page section spacing */
--space-24: 96px;   /* Hero block vertical breathing room */
```

### 🔘 Geometry & Border Radii

We establish strict radius roles across interactive and structural elements:

| Component Type | Radius Value | CSS Variable | Tailwind Class | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Pill Badges & Tags** | `9999px` | `--radius-full` | `rounded-full` | Role pills (`Alumni`, `Faculty`), status tags |
| **Interactive Buttons**| `8px` | `--radius-btn` | `rounded-lg` | Primary CTAs, ghost buttons, form controls |
| **Form Inputs & Selects**| `8px` | `--radius-input` | `rounded-lg` | Textfields, search bars, filter dropdowns |
| **Domain Category Cards**| `12px` | `--radius-card` | `rounded-xl` | Pastel taxonomy cards, job cards, dossiers |
| **Hero Stages & Modals** | `16px` | `--radius-stage` | `rounded-2xl` | Telemetry stages, code blocks, dialog modals |

### 🪟 Surface Architecture & Hairline Borders

In accordance with the **Hashnode & Alden** standards:
- **No Heavy Drop Shadows:** We avoid multi-stop blurred shadows that muddy light backgrounds.
- **Two-Tone Contrast:** A card with background `#ffffff` placed on `--color-parchment-cream` (`#f7f6f2`) creates clean, readable contrast naturally.
- **Hairline Definition:** All cards, tables, and stages feature a crisp `1px solid var(--color-stone)` (`#d1d4d9`).
- **Interactive Lift:** On hover, interactive cards receive a subtle `-2px` translateY lift with an ultra-soft crisp shadow:
  ```css
  box-shadow: 0 4px 12px rgba(17, 17, 17, 0.05);
  border-color: #111111;
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms ease;
  ```

---

## 6. Component Patterns & UI Library

### 6.1 Technical Eyebrow Indicators (`● MONO-TAG`)
Every section and major component starts with an uppercase monospace eyebrow tag featuring a colored indicator dot:
- `● ALUMNI-DIRECTORY` (Violet dot)
- `● CAREER-PORTAL` (Mint dot)
- `● ATS-WORKBENCH` (Amber dot)
- `● SYSTEM-TELEMETRY` (Aqua dot)

### 6.2 Single Dominant CTA Discipline
To eliminate decision paralysis:
- **Primary CTA (`.btn-ink`):** Solid `--color-ink` (`#111111`), white text, `8px` radius. Exactly **one** per hero or card context.
- **Secondary / Ghost CTA (`.btn-ghost`):** Transparent or Paper White background, hairline border `1px solid var(--color-stone)`, ink text.
- **Brand Accent CTA (`.btn-phoenix`):** Phoenix Orange (`#e8400d`) reserved exclusively for primary application submissions or key system actions.

### 6.3 Pastel Domain Taxonomy Cards
Domain cards leverage flat pastel fills with high-contrast Ink text. The background color itself signifies the domain:
- Card surface is filled with `--color-soft-violet`, `--color-mint-green`, etc.
- Internal borders are kept at `1px solid rgba(17, 17, 17, 0.08)`.
- Typographic hierarchy remains crisp near-black (`#111111`), never muted or washed out.

### 6.4 Hashnode-Style Matrix & Job Dossier Feed
Listings (Jobs, Applications, Mentorship requests) are rendered in a clean 2-column or 3-column responsive grid:
- Left column / header: Role title, company name, salary or department.
- Badges: Pill badges (`Alumni Referral`, `Full-time`, `Remote`, `Verified Institution`).
- Right column / footer: Single-click direct action button (`Başvuru Yap` / `Detayları İncele`).

### 6.5 Dual-Mode 404 & 5xx Error Resilience
In compliance with project rules:
- **API Mode:** Clean JSON error responses `{ "status": "error", "message": "..." }` with appropriate status codes (`404` or `500`).
- **Browser Mode:** User-friendly HTML views rendered on Parchment Cream with an Ink card, polite copy, and an immediate navigation return button.
- **Error Logging:** All 5xx events are appended to `logs/error.logs` with full stack traces, keeping log files isolated from git.

---

## 7. HTML & CSS Component Recipes

### 🏷️ Recipe 1: Academic Hero Section with Inline Sky Annotation
```html
<section class="ats-hero">
  <div class="ats-eyebrow">
    <span class="ats-dot dot-violet"></span>
    HIGHER EDUCATION GRADUATE NETWORK
  </div>
  
  <h1 class="ats-display-title">
    Connecting institutional legacy with 
    <span class="ats-highlight">transformative</span> careers.
  </h1>
  
  <p class="ats-hero-lead">
    A unified platform for graduates, students, and academic departments to maintain lifelong relationships, share verified job openings, and streamline mentorship.
  </p>

  <div class="ats-cta-row">
    <a href="/jobs" class="ats-btn ats-btn-primary">İş İlanlarını Keşfet</a>
    <a href="/users" class="ats-btn ats-btn-ghost">Mezunlar Rehberi</a>
  </div>
</section>

<style>
.ats-hero {
  background-color: var(--color-parchment-cream, #f7f6f2);
  padding: 64px 32px;
  border-bottom: 1px solid var(--color-stone, #d1d4d9);
  text-align: left;
}
.ats-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #111111;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.ats-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-violet { background-color: #8b5cf6; }
.ats-display-title {
  font-family: var(--font-editorial);
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #111111;
  max-width: 840px;
  margin: 0 0 20px 0;
}
.ats-highlight {
  background-color: var(--color-sky-highlight, #97cde5);
  padding: 2px 6px;
  border-radius: 4px;
}
.ats-hero-lead {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.6;
  color: #444444;
  max-width: 680px;
  margin-bottom: 32px;
}
.ats-cta-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.ats-btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  transition: all 150ms ease;
}
.ats-btn-primary {
  background-color: #111111;
  color: #ffffff;
  border: 1px solid #111111;
}
.ats-btn-primary:hover {
  background-color: #272625;
}
.ats-btn-ghost {
  background-color: #ffffff;
  color: #111111;
  border: 1px solid #d1d4d9;
}
.ats-btn-ghost:hover {
  border-color: #111111;
}
</style>
```

---

### 🎴 Recipe 2: 4-Pillar Pastel Domain Grid (Amplemarket Taxonomy)
```html
<div class="ats-domain-grid">
  <!-- Alumni Card (Soft Violet) -->
  <div class="ats-domain-card domain-violet">
    <div class="domain-header">
      <span class="domain-tag">● ALUMNI-DIRECTORY</span>
      <span class="domain-stat">2,450+ Mezun</span>
    </div>
    <h3>Mezunlar Ağı</h3>
    <p>Mezun profillerini görüntüleyin, dönem ve bölümlere göre filtreleyin, akademik ağınızı genişletin.</p>
    <a href="/users" class="domain-action">Rehberi İncele →</a>
  </div>

  <!-- Job Board Card (Mint Green) -->
  <div class="ats-domain-card domain-mint">
    <div class="domain-header">
      <span class="domain-tag">● CAREER-PORTAL</span>
      <span class="domain-stat">48 Aktif İlan</span>
    </div>
    <h3>Kariyer & İlanlar</h3>
    <p>Mezunlar ve kurumsal ortaklar tarafından paylaşılan en güncel tam zamanlı ve staj fırsatları.</p>
    <a href="/jobs" class="domain-action">Fırsatları Gör →</a>
  </div>

  <!-- ATS Card (Canary Yellow) -->
  <div class="ats-domain-card domain-canary">
    <div class="domain-header">
      <span class="domain-tag">● ATS-WORKBENCH</span>
      <span class="domain-stat">12 Bekleyen</span>
    </div>
    <h3>Aday Takip Sistemi</h3>
    <p>İlan başvurularını inceleyin, aday CV ve portföy dosyalarını değerlendirin, süreci yönetin.</p>
    <a href="/applications" class="domain-action">Başvuruları Yönet →</a>
  </div>

  <!-- Events Card (Petal Pink) -->
  <div class="ats-domain-card domain-pink">
    <div class="domain-header">
      <span class="domain-tag">● CAMPUS-EVENTS</span>
      <span class="domain-stat">6 Yaklaşan</span>
    </div>
    <h3>Duyurular & Etkinlikler</h3>
    <p>Mezunlar buluşması, kariyer panelleri ve akademik seminer takvimine anında erişin.</p>
    <a href="/events" class="domain-action">Etkinlikleri Keşfet →</a>
  </div>
</div>

<style>
.ats-domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 32px;
  background-color: var(--color-parchment-cream, #f7f6f2);
}
.ats-domain-card {
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.ats-domain-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(17, 17, 17, 0.06);
}
.domain-violet { background-color: var(--color-soft-violet, #e2ddfd); }
.domain-mint   { background-color: var(--color-mint-green, #b7efb2); }
.domain-canary { background-color: var(--color-canary-yellow, #ffef99); }
.domain-pink   { background-color: var(--color-petal-pink, #ffd7f0); }

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #111111;
  margin-bottom: 14px;
}
.domain-stat {
  background: rgba(255, 255, 255, 0.6);
  padding: 3px 8px;
  border-radius: 9999px;
  font-size: 11px;
}
.ats-domain-card h3 {
  font-family: var(--font-editorial);
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #111111;
}
.ats-domain-card p {
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  margin: 0 0 20px 0;
}
.domain-action {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  color: #111111;
  text-decoration: none;
  align-self: flex-start;
}
</style>
```

---

### 💼 Recipe 3: Hashnode-Style Job Matrix Feed Card with Role Pills
```html
<article class="ats-feed-card">
  <div class="feed-main">
    <div class="feed-badge-row">
      <span class="ats-pill pill-violet">Alumni Referral</span>
      <span class="ats-pill pill-gray">Tam Zamanlı</span>
      <span class="ats-pill pill-gray">Hibrit / İstanbul</span>
    </div>
    <h4 class="feed-title">Senior Full-Stack Node.js Engineer</h4>
    <p class="feed-company">Getir • Bilgisayar Mühendisliği '18 Mezun Kurucusu</p>
  </div>
  <div class="feed-aside">
    <span class="feed-salary">₺95.000 – ₺130.000 / ay</span>
    <a href="/jobs/101" class="ats-btn ats-btn-primary">Başvuruyu Başlat</a>
  </div>
</article>

<style>
.ats-feed-card {
  background-color: #ffffff;
  border: 1px solid var(--color-stone, #d1d4d9);
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 12px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.ats-feed-card:hover {
  border-color: #111111;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.feed-badge-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.ats-pill {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pill-violet {
  background-color: var(--color-soft-violet, #e2ddfd);
  color: #10054d;
}
.pill-gray {
  background-color: var(--color-cream-wash, #ecebea);
  color: #444444;
}
.feed-title {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 4px 0;
}
.feed-company {
  font-family: var(--font-sans);
  font-size: 13px;
  color: #666666;
  margin: 0;
}
.feed-aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
.feed-salary {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: #111111;
}
</style>
```

---

## 8. Do's and Don'ts Guide

### ✅ DO
1. **Do enforce Single Dominant CTA discipline:** Ensure only one filled, high-contrast `#111111` or `#e8400d` button exists in the primary viewport area.
2. **Do respect the Pastel Category Taxonomy:** Keep the assigned pastel background colors consistent for Alumni (`#e2ddfd`), Jobs (`#b7efb2`), ATS (`#ffef99`), Events (`#ffd7f0`), and Telemetry (`#99fff9`).
3. **Do restrain headline font weight:** Use `font-weight: 400` with tight letter spacing (`-0.04em`) for large headlines (44px–56px) to maintain editorial calm.
4. **Do use crisp 1px hairline borders:** Layer Paper White (`#ffffff`) elements onto Parchment Cream (`#f7f6f2`) with `1px solid #d1d4d9` instead of applying blurry drop shadows.
5. **Do format technical metadata with monospace eyebrows:** Always prefix category labels with a colored dot (`● API-SWAGGER`).

### ❌ DON'T
1. **Don't use low-contrast pastel text:** Never render body or title text in pastel colors. Pastels are exclusively reserved for surface fills and tags; text must remain near-black (`#111111`).
2. **Don't use multiple competing bright buttons:** Avoid placing two solid saturated buttons side-by-side. Use one filled button and one ghost/hairline button.
3. **Don't apply heavy blurred drop shadows:** Avoid `box-shadow: 0 10px 30px rgba(0,0,0,0.15)`. It produces muddy enterprise styling inconsistent with our editorial aesthetic.
4. **Don't mix font tiers haphazardly:** Do not render long body paragraphs in Serif or large headings in Monospace. Keep Serif for titles, Sans for UI/body, and Mono for tags/code.

---

## 9. Production Token Implementations (CSS & Tailwind v4)

### 📄 9.1 Pure CSS Custom Properties (`:root`)

```css
:root {
  /* Surface Layers */
  --color-canvas-white: #ffffff;
  --color-parchment-cream: #f7f6f2;
  --color-cream-wash: #ecebea;
  --color-stone: #d1d4d9;

  /* Typography & Ink */
  --color-ink: #111111;
  --color-charcoal: #272625;
  --color-ash: #6d6c6b;
  --color-midnight-indigo: #10054d;

  /* Domain Taxonomy Pastels */
  --color-soft-violet: #e2ddfd;
  --color-mint-green: #b7efb2;
  --color-canary-yellow: #ffef99;
  --color-petal-pink: #ffd7f0;
  --color-aqua: #99fff9;

  /* Accents & Highlights */
  --color-phoenix-orange: #e8400d;
  --color-sky-highlight: #97cde5;

  /* Semantic Status */
  --color-status-success: #16a34a;
  --color-status-warning: #d97706;
  --color-status-danger: #dc2626;
  --color-status-info: #0284c7;

  /* Font Stacks */
  --font-editorial: "Source Serif 4", "P22 Mackinac Pro", Georgia, serif;
  --font-sans: "Inter", "Labil Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", "IBM Plex Mono", SFMono-Regular, Menlo, monospace;

  /* Corner Radii */
  --radius-btn: 8px;
  --radius-input: 8px;
  --radius-card: 12px;
  --radius-stage: 16px;
  --radius-full: 9999px;

  /* Elevation */
  --elevation-hairline: 1px solid var(--color-stone);
  --elevation-hover: 0 4px 12px rgba(17, 17, 17, 0.05);
}
```

### 💨 9.2 Tailwind CSS v4 `@theme` Configuration Block

```css
@theme {
  /* Colors */
  --color-canvas-white: #ffffff;
  --color-parchment-cream: #f7f6f2;
  --color-cream-wash: #ecebea;
  --color-stone: #d1d4d9;
  
  --color-ink: #111111;
  --color-charcoal: #272625;
  --color-ash: #6d6c6b;
  --color-midnight-indigo: #10054d;

  --color-soft-violet: #e2ddfd;
  --color-mint-green: #b7efb2;
  --color-canary-yellow: #ffef99;
  --color-petal-pink: #ffd7f0;
  --color-aqua: #99fff9;

  --color-phoenix-orange: #e8400d;
  --color-sky-highlight: #97cde5;

  /* Fonts */
  --font-editorial: "Source Serif 4", "P22 Mackinac Pro", Georgia, serif;
  --font-sans: "Inter", "Labil Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "IBM Plex Mono", SFMono-Regular, Menlo, monospace;

  /* Radii */
  --radius-btn: 8px;
  --radius-card: 12px;
  --radius-stage: 16px;
  --radius-full: 9999px;
}
```

---

> 🔗 **Related Architecture & Brand Guides:**
> - [Master README (`README.md`)](README.md)
> - [Brand Identity & Guidelines (`brand.md`)](brand.md)
> - [Automation Protocols (`AGENTS.md`)](AGENTS.md)
> - [Interactive API Swagger (`/api/swagger`)](http://localhost:5001/api/swagger)
