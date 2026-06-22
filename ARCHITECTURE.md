# AV Impact Website — Architecture

## Overview

The AV Impact website is a Vite-based React SPA (Single Page Application) using TypeScript and Tailwind CSS. It showcases a B2B AV integration company's services, brands, industries, projects, and careers.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| Animation | Motion (Framer) |
| Package Manager | npm |

---

## Directory Structure

```
src/
├── App.tsx                    # Root router + global providers + LeadModal singleton
├── main.tsx                   # React entry point
├── index.css                  # Global CSS design tokens + utility classes
│
├── components/
│   ├── index.ts               # Barrel exports for all public components
│   ├── forms/
│   │   └── LeadModal.tsx      # Multi-step consultation lead capture modal
│   ├── layout/
│   │   ├── Navbar.tsx         # Sticky navigation with mobile drawer + industry dropdown
│   │   └── Footer.tsx         # Footer with solutions, industries, trust indicators
│   ├── ui/
│   │   ├── AVImpactLogo.tsx   # SVG brand logo component
│   │   ├── BrandLogo.tsx      # Partner brand name renderer
│   │   ├── AnimatedMetric.tsx # Counter animation for KPIs
│   │   ├── CountUpNumber.tsx  # Number count-up effect
│   │   ├── ProgressRing.tsx   # SVG circular progress indicator
│   │   └── SEO.tsx            # SEO metadata injection component
│   └── visualizers/
│       ├── NetworkBackground.tsx  # Animated SVG network node background
│       └── WaveBackground.tsx     # Animated wave SVG background
│
├── constants/
│   ├── index.ts               # NAV_INDUSTRIES, FOOTER_SOLUTIONS, FOOTER_INDUSTRIES, FOOTER_TRUST_INDICATORS
│   ├── brandMappings.ts       # Global brand → category mappings
│   ├── industryMappings.ts    # Industry → category cross-reference data
│   ├── seoData.ts             # Per-route SEO metadata (title, desc, OG, JSON-LD)
│   ├── spaceConfigurations.ts # Space type configurations for BrandsProducts
│   ├── homeData.ts            # homePartnerBrands + capabilities for Home page
│   ├── careersData.ts         # jobOpenings data for Careers page
│   └── aboutData.ts           # processSteps data for About page
│
├── contexts/
│   ├── UIContext.tsx          # Global UI state: openLeadModal(), closeLeadModal()
│   ├── LeadContext.tsx        # Lead submission + localStorage persistence
│   └── ModalContext.tsx       # Modal open/close state management
│
├── hooks/
│   ├── useLeadForm.ts         # Form state + sanitized submission for LeadModal
│   ├── useModal.ts            # Modal visibility state hook
│   ├── useSEO.ts              # Applies SEO metadata from seoData.ts for a given route
│   ├── useAssemblyAnimation.ts# Animation state for RoomAssemblyAnimation
│   ├── useRevealObserver.ts   # IntersectionObserver for .reveal CSS class animation
│   ├── useScrollProgress.ts   # Window scroll 0–100 percentage tracking
│   └── useTilt.ts             # 3D card tilt effect on mouse hover
│
├── pages/
│   ├── Home.tsx               # Landing page with hero, capabilities, brands, stats
│   ├── About.tsx              # Company story, process, values, CTA
│   ├── Industries.tsx         # Industry-specific AV solution breakdowns
│   ├── Solutions.tsx          # AV solution categories
│   ├── Projects.tsx           # Portfolio of completed projects
│   ├── Contact.tsx            # Multi-step guided consultation form
│   ├── Careers.tsx            # Job openings + career application form
│   ├── CompanyProfile.tsx     # Downloadable company profile page
│   └── BrandsProducts/        # Complex feature module (see below)
│       ├── index.tsx          # Main BrandsProducts page entry point
│       ├── components/
│       │   ├── BrandExplorer.tsx          # Interactive brand → category explorer
│       │   ├── RoomAssemblyAnimation.tsx  # Step-by-step AV room assembly animation
│       │   ├── RoomConfigurator.tsx       # Room size selector with feature lists
│       │   ├── RoomVisualizer.tsx         # Visual room type switcher
│       │   ├── SolutionAdvisor.tsx        # Space → recommendation matcher
│       │   └── TechnologyHotspots.tsx     # Interactive hotspot overlay on room image
│       ├── constants/
│       │   ├── brandMappings.ts           # Local brand data (extended)
│       │   ├── designerRecommendations.ts # Space-based design tips & product recs
│       │   └── roomConfigurations.ts      # Room size feature configs
│       └── hooks/
│           ├── useHotspots.ts             # Hotspot state (hover, active)
│           ├── useRoomAssembly.ts         # Assembly animation step machine
│           └── useRoomDesigner.ts         # Industry ↔ category connection lines + room state
│
├── types/
│   └── index.ts               # Shared TypeScript interfaces (Lead, FormStep, etc.)
│
└── utils/
    ├── sanitize.ts            # sanitizeString() — XSS prevention for all user inputs
    └── scrollUtils.ts         # scrollToElement() — smooth scroll to ref
```

---

## State Management

The app uses **React Context** exclusively — no Redux or Zustand.

### Context Hierarchy

```
<LeadContextProvider>          ← Lead data + localStorage persistence
  <UIContextProvider>          ← openLeadModal / closeLeadModal
    <App />                    ← Router + AppRoutes + <LeadModal />
```

### UIContext

- Exposes `openLeadModal(type, requirement?)` and `closeLeadModal()`
- Any page/component can call `openLeadModal("quotation")` to open the consultation assistant

### LeadContext

- `submitLead(data)` — sanitizes and saves to `localStorage` key `av_impact_leads`
- All lead data is sanitized via `sanitizeString()` before persistence

---

## Routing

Defined in `App.tsx` using `react-router-dom` v7.

All page components are **lazy-loaded** with `React.lazy()` + `<Suspense>`:

```tsx
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
// ... all 9 pages
```

This ensures each page is only loaded when navigated to.

---

## SEO Architecture

Each page's SEO metadata (title, description, OG tags, JSON-LD) is defined centrally in:

```
src/constants/seoData.ts
```

The `useSEO(path)` hook reads the correct entry and applies it to the document head. Pages call:

```tsx
useSEO("/about");
```

---

## Lead Capture Flow

1. Any CTA button calls `openLeadModal("quotation" | "sales", requirementType?)`
2. `LeadModal.tsx` renders a multi-step form (space type → room size → contact info)
3. On submit, `useLeadForm.ts` sanitizes all fields via `sanitizeString()`
4. Data is saved to `localStorage["av_impact_leads"]` as a JSON array
5. A thank-you confirmation screen is shown

---

## Shared Hooks Reference

| Hook | Purpose |
|---|---|
| `useRevealObserver()` | Adds `.active` class to `.reveal` elements on scroll intersection |
| `useScrollProgress()` | Returns 0–100 scroll percentage for the progress bar |
| `useTilt(maxDeg)` | Returns `handleTiltMove` / `handleTiltLeave` for 3D card hover effect |
| `useSEO(path)` | Applies page-specific SEO metadata from `seoData.ts` |

---

## Key Design Decisions

### Why no Redux?
The app has two global state concerns: modal open/close and lead data. React Context is sufficient and avoids the boilerplate and bundle cost of Redux.

### Why localStorage?
Lead submissions are stored client-side for demo/prototype mode. In production, this would be replaced by a backend POST to a CRM or email service.

### Why Tailwind v4?
Tailwind v4 uses the `@tailwindcss/vite` plugin for native CSS-level integration without a PostCSS config file, reducing build complexity.
