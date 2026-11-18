# 🎨 Alumni Tracking System — Brand Guidelines & Design System

> **Platform:** Alumni Tracking System (ATS)  
> **Version:** 1.0.0  
> **Status:** Official Design & Identity Specification  
> **Anchor in Master Documentation:** [`README.md#brand-identity`](README.md#brand-identity)

---

## 📑 Table of Contents
1. [Brand Overview & Philosophy](#1-brand-overview--philosophy)
2. [Tone of Voice & Messaging Framework](#2-tone-of-voice--messaging-framework)
3. [Color Palette & Design Tokens](#3-color-palette--design-tokens)
4. [Typography & Text Hierarchy](#4-typography--text-hierarchy)
5. [Iconography & Visual Metaphors](#5-iconography--visual-metaphors)
6. [UI Component & Layout Guidelines](#6-ui-component--layout-guidelines)
7. [Accessibility & Contrast Standards](#7-accessibility--contrast-standards)
8. [Brand Application Examples](#8-brand-application-examples)

---

## 1. Brand Overview & Philosophy

The **Alumni Tracking System** represents the digital bridge connecting higher education institutions, distinguished graduates, active students, and corporate partners.

### 🌟 Core Purpose
To empower universities to maintain enduring relationships with alumni, track career progression, foster student mentorship, and streamline job opportunity sharing through a unified, high-performance web platform.

### 🏛️ Brand Pillars
- **Academic Prestige & Legacy:** Honoring institutional heritage and graduate achievements.
- **Career Mobility:** Fostering transparent job placement, internships, and hiring pathways.
- **Community & Mentorship:** Connecting aspiring students with established industry leaders.
- **Operational Excellence:** Modern, containerized, fast, and accessible digital tooling.

---

## 2. Tone of Voice & Messaging Framework

Our communication style reflects a balance between academic credibility and modern technological sophistication.

| Dimension | Tone Character | How It Translates in UI & Copy |
| :--- | :--- | :--- |
| **Professional** | Competent, polite, dependable | Clear action labels (`İlanları İncele`, `Başvuru Yap`, `Profili Düzenle`). |
| **Academic** | Structured, informative, formal | Clear department labels, graduation years, verified institution metrics. |
| **Modern & Agile** | Crisp, concise, purposeful | Real-time status indicators (`System Online`, `PostgreSQL 15 Connected`). |
| **Defensive & Polite** | Reassuring during errors | Clean error pages (`We're sorry, the page you are looking for does not exist`). |

### 📢 Official Taglines
- **Primary (EN):** *"Connecting Graduates, Empowering Futures."*
- **Primary (TR):** *"Yükseköğretim Mezun Takip & Kariyer Yönetim Platformu"*
- **Secondary:** *"From Campus to Career — Lifelong Institutional Connection."*

---

## 3. Color Palette & Design Tokens

The Alumni Tracking System design palette utilizes clean corporate blues, slate neutrals, and purposeful status accents designed to convey clarity and trust.

### 🎨 Primary & Neutral Palette

| Token Name | Hex Code | RGB | Usage |
| :--- | :--- | :--- | :--- |
| `--brand-primary` | `#2563eb` | `37, 99, 235` | Primary buttons, active tabs, brand accents, focused states |
| `--brand-primary-hover` | `#1d4ed8` | `29, 78, 216` | Hover state for primary buttons and interactive elements |
| `--brand-dark` | `#0f172a` | `15, 23, 42` | Hero backgrounds, main headings (`h1`, `h2`), high-contrast text |
| `--brand-surface` | `#f8fafc` | `248, 250, 252` | Main page canvas background, neutral containers |
| `--brand-card` | `#ffffff` | `255, 255, 255` | Elevated cards, dialog boxes, form backgrounds |
| `--brand-border` | `#e2e8f0` | `226, 232, 240` | Subtle element borders, card dividers, table separators |
| `--brand-muted` | `#64748b` | `100, 116, 139` | Secondary captions, timestamps, placeholder text, breadcrumbs |

### 🚦 Semantic & Status Colors

| Semantic State | Base Color | Light Tint (BG) | Border Tint | Typical Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Success (Accepted / Done)** | `#16a34a` (Green) | `#f0fdf4` | `#bbf7d0` | Accepted applications, save notifications, live server pills |
| **Warning (Review / Pending)** | `#d97706` (Amber) | `#fffbeb` | `#fde68a` | Under review applications, draft postings, caution banners |
| **Danger / Error (404 / 5xx)** | `#dc2626` (Red) | `#fef2f2` | `#fee2e2` | Rejected applications, deletion alerts, 404 badges, error logs |
| **Info / Telemetry** | `#0284c7` (Sky) | `#e0f2fe` | `#bae6fd` | HTTP 404 code highlights, stats numbers, informative pills |

---

## 4. Typography & Text Hierarchy

We prioritize native system font stacks for zero layout shifts, instantaneous font rendering, and seamless cross-platform consistency.

### 🔤 Font Stacks
```css
/* Standard UI Typography */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

/* Monospace (Code, Paths, IDs, Telemetry) */
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### 📏 Typographic Scale

| Element | Size | Weight | Line Height | Color |
| :--- | :--- | :--- | :--- | :--- |
| **Page Title (`h1`)** | `1.75rem - 2.0rem` | `800` (Extrabold) | `1.2` | `#0f172a` |
| **Section Title (`h2`)** | `1.25rem - 1.4rem` | `700` (Bold) | `1.3` | `#0f172a` |
| **Card / Subheading (`h3`)**| `1.05rem - 1.15rem` | `600` (Semibold) | `1.4` | `#0f172a` |
| **Body Text** | `0.95rem - 1.0rem` | `400` (Regular) | `1.6` | `#334155` |
| **Secondary / Captions** | `0.85rem` | `500` (Medium) | `1.4` | `#64748b` |
| **Pills & Badges** | `0.75rem` | `700` (Bold, Uppercase) | `1.0` | Contextual |

---

## 5. Iconography & Visual Metaphors

Our visual iconography relies on universally recognized, accessible emojis and SVG vectors:

- 🎓 **Mortarboard:** Higher education, alumni status, institutional heritage.
- 💼 **Briefcase:** Job postings, career opportunities, internships.
- 📝 **Clipboard:** Candidate applications, ATS review process, dossiers.
- 👥 **Two People:** Alumni directory, networking, student/faculty directories.
- 📢 **Megaphone:** Institutional announcements, news, event invites.
- 🐘 **Elephant:** PostgreSQL 15 ACID persistence layer.
- 🛡️ **Shield:** 404/5xx Guardians, authentication, defensive error handling.
- 🟢 **Green Dot:** Real-time health status, live server telemetry.

---

## 6. UI Component & Layout Guidelines

### 🎴 Card Design
- **Background:** `#ffffff`
- **Border:** `1px solid #e2e8f0`
- **Border Radius:** `10px - 12px`
- **Shadow:** Subtle multi-layer shadow:  
  `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);`
- **Hover Transitions:** Smooth `150ms ease` with slight lift (`translateY(-2px)`).

### 🔘 Button Standards
- **Primary Action (`.btn-primary`):** Solid Blue `#2563eb`, white text, border radius `6px - 8px`. Used for main conversion actions (Save, Submit, Publish).
- **Secondary Action (`.btn-secondary`):** White background `#ffffff`, border `1px solid #cbd5e1`, dark text `#334155`. Used for navigational or secondary tasks.
- **Success Action (`.btn-success`):** Emerald Green `#16a34a`, used for positive review decisions (Accept, Approve).
- **Danger Action (`.btn-danger`):** Red `#dc2626`, used for destructive actions (Delete, Reject, Withdraw).

### 🏷️ Status Badges
- Compact padding (`4px 10px`), fully rounded (`border-radius: 9999px`), bold uppercase font (`0.75rem`).
- Examples:
  - `Submitted` ➔ Gray / Neutral
  - `Under Review` ➔ Amber Warning
  - `Accepted` ➔ Emerald Success
  - `Rejected` ➔ Red Danger

---

## 7. Accessibility & Contrast Standards

1. **WCAG 2.1 AA Compliance:** All text colors against background surfaces maintain a contrast ratio of at least **4.5:1** for normal text and **3:1** for large headings.
2. **Defensive Error Feedback:** Form validation and 404 error states always accompany textual descriptions alongside color cues, ensuring screen-reader accessibility.
3. **No Unstyled Flashes:** Layouts are server-rendered with critical inline CSS to prevent cumulative layout shift (CLS).

---

## 8. Brand Application Examples

- **Operations Workbench (Homepage):** [`http://localhost:5001/`](http://localhost:5001/)
- **Alumni Directory:** [`http://localhost:5001/users`](http://localhost:5001/users)
- **Job Postings Board:** [`http://localhost:5001/jobs`](http://localhost:5001/jobs)
- **Candidate Tracking ATS:** [`http://localhost:5001/applications`](http://localhost:5001/applications)
- **404 Guardian Error Page:** [`http://localhost:5001/sayfa-bulunamadi`](http://localhost:5001/sayfa-bulunamadi)
- **Interactive Swagger Docs:** [`http://localhost:5001/api/swagger`](http://localhost:5001/api/swagger)

---

> 🔗 **Related Documentation:**
> - [Master README](README.md)
> - [Domain-Driven Data Architecture (docs/ddd.md)](docs/ddd.md)
> - [Agent & Workflow Automation (AGENTS.md)](AGENTS.md)
