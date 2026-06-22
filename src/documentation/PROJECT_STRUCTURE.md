# Project Structure

This document describes the folder organization and file responsibilities for the AV Impact website.

---

## Root Level

```
kdidi-main/
├── .gitignore              — Git ignore rules (node_modules, dist, .env)
├── .vscode/                — Editor settings (launch configs, extensions)
├── index.html              — Vite HTML entry point
├── package.json            — Dependencies, scripts, project metadata
├── tsconfig.json           — TypeScript compiler configuration
├── vite.config.ts          — Vite build and dev server configuration
├── public/                 — Static assets served at the root URL
└── src/                    — All application source code
```

---

## `public/`

Static files served directly by the web server. **Not processed by Vite.**

```
public/
└── assets/
    ├── logo.png                    — AV Impact logo (primary)
    ├── boardroom_hero.png          — Hero background image
    ├── boardroom_curved.png        — Boardroom photo variant
    ├── boardroom_after.png         — Project before/after photo
    ├── boardroom_before.png        — Project before/after photo
    ├── broadcast_summit.png        — Broadcast/event project photo
    ├── classroom_interactive.png   — Education project photo
    ├── project_broadcast.png       — Broadcast project photo
    ├── project_classroom.png       — Classroom project photo
    ├── project_lobby.png           — Lobby project photo
    ├── project_presentation.png    — Presentation room photo
    ├── residential_cinema.png      — Home cinema photo
    └── AV_Impact_Company_Profile.pdf  — Legacy PDF (pre-web brochure)
```

---

## `src/`

All TypeScript and CSS source files.

```
src/
├── main.tsx               — React DOM root entry point
├── App.tsx                — Router, global modal, lazy page imports
├── index.css              — Global design system (tokens, utilities, animations)
│
├── types/
│   └── index.ts           — Shared TypeScript interfaces and types
│
├── constants/
│   └── index.ts           — Shared static data (nav items, footer lists, trust indicators)
│
├── hooks/
│   (empty after cleanup — useTilt removed as it had no consumers)
│
├── components/
│   ├── index.ts           — Barrel export for all public components
│   ├── AVImpactLogo.tsx   — Logo component with image + SVG fallback
│   ├── BrandLogo.tsx      — Brand logo renderer (text-based, SVG fallback)
│   ├── AnimatedMetric.tsx — Animated number/text value display
│   ├── Navbar.tsx         — Sticky top navigation with dropdown and mobile drawer
│   ├── Footer.tsx         — Full-width site footer with CTA, links, contact
│   ├── backgrounds/
│   │   ├── HeroBackground.tsx     — Animated SVG hero section background
│   │   ├── NetworkBackground.tsx  — Animated network node SVG background
│   │   └── WaveBackground.tsx     — Animated wave SVG background
│   ├── modals/
│   │   └── LeadModal.tsx          — Global lead capture form modal (CustomEvent-driven)
│   └── ui/
│       ├── CountUpNumber.tsx      — Intersection-observer count-up animation
│       └── ProgressRing.tsx       — SVG circular progress ring with animation
│
├── pages/
│   ├── Home.tsx           — Landing page (hero, solutions, industries, stats, CTA)
│   ├── Solutions.tsx      — AV solution categories detail page
│   ├── Projects.tsx       — Client project portfolio
│   ├── BrandsProducts.tsx — Hardware brands and product lines
│   ├── Industries.tsx     — Industry-specific AV deployment showcase
│   ├── Careers.tsx        — Job listings and company culture
│   ├── Contact.tsx        — Contact form and office information
│   ├── About.tsx          — Company history, mission, and team
│   └── CompanyProfile.tsx — 8-page print-ready A4 corporate brochure
│
└── documentation/
    ├── README.md           — Project overview and setup guide
    ├── PROJECT_STRUCTURE.md  — This file
    ├── COMPONENT_MAP.md    — All components and their dependencies
    ├── PAGE_MAP.md         — All pages, user flows, and sections
    └── CLEANUP_REPORT.md   — Audit findings and refactoring summary
```

---

## Architecture Decisions

### Routing
All routing is handled by **React Router DOM v7** in `App.tsx`. Every page is lazy-loaded via `React.lazy()` + `Suspense` for optimal initial bundle size.

### Global Modal
The `<LeadModal>` is mounted once in `App.tsx` and triggered from any page or component using:
```js
window.dispatchEvent(new CustomEvent("open-av-modal", { detail: { type: "quotation" } }));
```
This pattern avoids prop drilling and keeps form logic in a single place.

### CSS Design System
All design tokens (colors, spacing, typography) are defined as CSS custom properties in `src/index.css` inside a `@theme {}` block (Tailwind v4 syntax). This ensures every page shares the same visual identity.

### Constants
Shared static data (navigation dropdowns, footer lists) lives in `src/constants/index.ts` and is imported by both `Navbar.tsx` and `Footer.tsx`. This eliminates duplication and makes content updates a single-file change.

### Print/PDF
The `/company-profile` route renders an 8-page A4 brochure using `.a4-page` CSS classes. Calling `window.print()` triggers the `@media print` rules in `index.css` that hide all non-brochure content and enforce exact A4 dimensions.
