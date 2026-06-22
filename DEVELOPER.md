# AV Impact Website — Developer Documentation

## Project Overview

A professional B2B marketing website for AV Impact, a commercial audiovisual solutions company based in Indore, India. Built with React 19 + TypeScript + Vite + Tailwind CSS v4.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173 or next available)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# TypeScript check (no emit)
npm run lint
```

---

## Project Structure

```
src/
├── App.tsx                         # Root router + global <LeadModal> singleton
├── index.css                       # Design tokens, utility classes, animations
├── types/
│   └── index.ts                    # Shared TypeScript interfaces
├── constants/
│   └── index.ts                    # Shared static data (nav items, footer lists)
├── components/
│   ├── index.ts                    # Barrel export for all public components
│   ├── AVImpactLogo.tsx             # Brand logo component (PNG + SVG fallback)
│   ├── AnimatedMetric.tsx           # Animated stats display
│   ├── BrandLogo.tsx                # Brand name → logo renderer
│   ├── Navbar.tsx                   # Shared sticky navigation
│   ├── Footer.tsx                   # Shared global footer + CTA section
│   ├── backgrounds/
│   │   ├── HeroBackground.tsx       # Animated hero section background
│   │   ├── NetworkBackground.tsx    # Animated network node SVG
│   │   └── WaveBackground.tsx       # Animated wave SVG
│   ├── modals/
│   │   └── LeadModal.tsx            # Global lead capture modal (multi-step form)
│   └── ui/
│       ├── CountUpNumber.tsx        # Scroll-triggered number animation
│       └── ProgressRing.tsx         # SVG circular progress indicator
├── pages/
│   ├── Home.tsx                     # Landing page
│   ├── Solutions.tsx                # Solutions listing
│   ├── Industries.tsx               # Industries served
│   ├── BrandsProducts.tsx           # Partner brands & product categories
│   ├── Projects.tsx                 # Project portfolio
│   ├── Careers.tsx                  # Job listings and culture
│   ├── Contact.tsx                  # Contact form and info
│   ├── About.tsx                    # Company story and team
│   └── CompanyProfile.tsx           # 8-page printable A4 brochure
└── documentation/
    ├── README.md                    # Project overview and setup
    ├── PROJECT_STRUCTURE.md         # Full folder responsibility map
    ├── COMPONENT_MAP.md             # Component props and dependencies
    ├── PAGE_MAP.md                  # Routes, user flows, sections
    └── CLEANUP_REPORT.md            # Refactoring audit and findings
```

---

## Routing

The app uses **React Router DOM v7** with lazy-loaded pages via `React.lazy` + `Suspense`. Routes are defined in `App.tsx`:

```tsx
const Home = lazy(() => import("./pages/Home"));
const Solutions = lazy(() => import("./pages/Solutions"));
// ...

<Routes>
  <Route path="/" element={<Home navigate={handleNavigate} />} />
  <Route path="/solutions" element={<Solutions navigate={handleNavigate} />} />
  {/* ... */}
</Routes>
```

To navigate programmatically from any component with the `navigate` prop:
```typescript
navigate("/solutions");         // goes to Solutions page
navigate("/solutions#process"); // goes to Solutions and scrolls to #process
```

---

## Global Modal System

The `<LeadModal>` component is mounted once as a singleton in `App.tsx` and listens to the global `open-av-modal` CustomEvent. This lets any component anywhere open the modal without prop drilling.

**Opening the modal:**
```typescript
window.dispatchEvent(new CustomEvent("open-av-modal", {
  detail: { type: "quotation" }   // "quotation" | "sales" | "scroll-email"
}));
```

**Modal types:**
| Type | Description |
|------|-------------|
| `"quotation"` | Multi-step inquiry flow → contact info |
| `"sales"` | Same as quotation, sales contact variant |
| `"scroll-email"` | Compact email capture |

**Lead storage:** Submitted leads are saved to `localStorage["av_impact_leads"]` as a JSON array.

---

## Shared Components

### `<Navbar>`
```tsx
<Navbar
  currentPath="/solutions"     // marks the active nav link
  navigate={navigate}          // navigation callback
  activeSection="home"         // (optional) override active section (Home page only)
/>
```
Industries dropdown data comes from `src/constants/index.ts` (`NAV_INDUSTRIES`).

### `<Footer>`
```tsx
<Footer navigate={navigate} />
```
Footer CTA buttons internally call `openModal()` which dispatches the `open-av-modal` event.
Solutions, industries, and trust indicator data come from `src/constants/index.ts`.

### `<CountUpNumber>`
```tsx
import { CountUpNumber } from "../components/ui/CountUpNumber";
<CountUpNumber target={500} suffix="+" duration={1500} />
```
Starts counting once the element scrolls into view (uses `IntersectionObserver`).

### `<ProgressRing>`
```tsx
import { ProgressRing } from "../components/ui/ProgressRing";
<ProgressRing percentage={95} />
```
SVG ring that animates to the given percentage on scroll into view.

### `<AnimatedMetric>`
```tsx
import { AnimatedMetric } from "../components/AnimatedMetric";
<AnimatedMetric value="150+" duration={1200} />
```
Animates a numeric string from 0 to its target value using `requestAnimationFrame`.

### `<NetworkBackground>`
```tsx
import { NetworkBackground } from "../components/backgrounds/NetworkBackground";
<NetworkBackground />
```
Animated SVG network graph — used as hero section background on most pages.

---

## Shared Constants

All shared static data is in `src/constants/index.ts`:

```typescript
import { NAV_INDUSTRIES } from "../constants";         // Navbar industries dropdown
import { FOOTER_SOLUTIONS } from "../constants";        // Footer solutions popover
import { FOOTER_INDUSTRIES } from "../constants";       // Footer industries popover
import { FOOTER_TRUST_INDICATORS } from "../constants"; // Footer trust strip
```

Update content here to affect both Navbar and Footer simultaneously.

---

## Adding a New Page

1. Create `src/pages/MyNewPage.tsx`:
```tsx
import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface MyNewPageProps {
  navigate: (path: string) => void;
}

export default function MyNewPage({ navigate }: MyNewPageProps) {
  return (
    <div>
      <Navbar currentPath="/my-new-page" navigate={navigate} />
      <main className="pt-24">
        {/* page content */}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
```

2. Register in `App.tsx`:
```tsx
const MyNewPage = lazy(() => import("./pages/MyNewPage"));
// ...
<Route path="/my-new-page" element={<MyNewPage navigate={handleNavigate} />} />
```

---

## Company Profile / Brochure

The `/company-profile` route renders an 8-page A4 print-ready brochure:

- Pages use `.a4-page` CSS class (exactly 210mm × 297mm)
- `@media print` in `index.css` hides all non-brochure UI
- `window.print()` opens the browser print dialog → "Save as PDF"
- The floating download button (in `App.tsx`) is globally visible, hidden during print via `.no-print`

---

## Design System

Classes and tokens are defined in `src/index.css`. Key custom classes:

| Class | Purpose |
|-------|---------|
| `.nav-underline` | Animated underline on nav links |
| `.nav-underline-active` | Active state underline |
| `.glow-radial-soft` | Soft ambient glow orb background |
| `.reveal` | Scroll-reveal wrapper (adds `active` class on intersection) |
| `.reveal-box` | Child of `.reveal`, animates in with stagger |
| `.tech-grid-dots` | Subtle dot-grid CSS background pattern |
| `.glass` | Glassmorphism card effect |
| `.glass-premium` | Premium glassmorphism with inset glow |
| `.animate-marquee` | Infinite horizontal brand logo marquee |
| `.a4-page` | Print-ready A4 page container (brochure only) |

Color tokens (defined under `@theme {}` in `index.css`):
- `--color-primary` — `#000924` (dark navy)
- `--color-secondary` — `#2559bd` (brand blue)
- `--color-background` — `#faf8ff`
