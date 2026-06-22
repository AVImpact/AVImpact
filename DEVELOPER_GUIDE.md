# AV Impact Website — Developer Guide

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| TypeScript | 5.8 (installed as dev dep) |

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd kdidi-main

# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens on http://localhost:5173 (or first available port)

# Type check (zero errors expected)
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Development Workflow

### Adding a New Page

1. Create `src/pages/MyPage.tsx`
2. Add lazy import in `src/App.tsx`:
   ```tsx
   const MyPage = lazy(() => import("./pages/MyPage"));
   ```
3. Add route in `<AppRoutes>`:
   ```tsx
   <Route path="/my-page" element={<MyPage navigate={navigate} />} />
   ```
4. Add SEO entry in `src/constants/seoData.ts`:
   ```ts
   "/my-page": {
     title: "My Page | AV Impact",
     description: "...",
     // ...
   }
   ```
5. Call in your component:
   ```tsx
   useSEO("/my-page");
   ```

### Adding a New Component

1. Create the component in the appropriate subdirectory under `src/components/`
2. Export it from `src/components/index.ts`:
   ```ts
   export { MyComponent } from "./ui/MyComponent";
   ```

### Adding Static Data

Never define data arrays inside page components. Put them in `src/constants/`:

```
homeData.ts       → Home page content
careersData.ts    → Job openings
aboutData.ts      → Process steps
seoData.ts        → SEO per route
brandMappings.ts  → Brand catalog
industryMappings.ts → Industry ↔ category links
index.ts          → Navbar, Footer lists
```

---

## Key Patterns

### Using the Lead Modal

```tsx
import { useUI } from "../contexts/UIContext";

const { openLeadModal } = useUI();

// In a button handler:
openLeadModal("quotation");              // Generic consultation
openLeadModal("sales", "boardroom");    // Pre-filled for sales + requirement
```

### Using Shared Hooks

```tsx
import { useSEO } from "../hooks/useSEO";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useRevealObserver } from "../hooks/useRevealObserver";
import { useTilt } from "../hooks/useTilt";

export default function MyPage() {
  useSEO("/my-page");                    // Apply SEO metadata
  useRevealObserver();                   // Enable .reveal scroll animations
  const scrollPercent = useScrollProgress();  // For scroll progress bar
  const { handleTiltMove, handleTiltLeave } = useTilt(5);  // For card 3D hover

  return (
    <>
      {/* Scroll progress bar */}
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 h-1 bg-secondary z-[60] w-full origin-left"
        style={{ transform: `scaleX(${scrollPercent / 100})` }}
      />

      {/* Animated section */}
      <div className="reveal">Content that fades in on scroll</div>

      {/* Tilt card */}
      <div onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
        Card content
      </div>
    </>
  );
}
```

### Sanitizing User Input

```tsx
import { sanitizeString } from "../utils/sanitize";

const safeValue = sanitizeString(userInput);
```

Always sanitize any user-provided string before storing or rendering it. `sanitizeString` strips HTML tags and encodes dangerous characters.

### Scroll-to-Element

```tsx
import { scrollToElement } from "../utils/scrollUtils";
import { useRef } from "react";

const targetRef = useRef<HTMLDivElement>(null);

// In handler:
scrollToElement(targetRef);  // Scrolls to ref with 96px header offset
```

---

## CSS / Design System

The design system lives in `src/index.css` using Tailwind CSS v4 custom properties.

### Core Color Tokens

| Token | Usage |
|---|---|
| `--color-primary` | Main brand blue (#2559bd) |
| `--color-secondary` | Accent green (#10b981) |
| `--color-background` | Page background |
| `--color-on-background` | Body text |

### Reveal Animation

Add `className="reveal"` to any element. `useRevealObserver()` will add `.active` when it scrolls into view.

CSS transition for reveal is defined in `index.css`:
```css
.reveal { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.reveal.active { opacity: 1; transform: translateY(0); }
```

---

## Accessibility Rules

All interactive elements must be:

1. **Keyboard navigable** — use `<button>` not `<div onClick>`
2. **Focus visible** — include `focus:ring-2 focus:ring-blue-500 focus:outline-none`
3. **ARIA labelled** — add `aria-label` where text content is insufficient
4. **Progress bars** — use `role="progressbar"` + `aria-valuenow/min/max`
5. **Dialogs** — use `role="dialog"` + `aria-modal` + `aria-labelledby`

---

## Lead Data Storage

Leads are stored in `localStorage["av_impact_leads"]` as a JSON array.

Each entry has:
```ts
{
  type: "quotation" | "sales" | "career-application",
  data: { /* sanitized form fields */ },
  id: number,        // Date.now()
  timestamp: string  // ISO 8601
}
```

To view all leads in browser console:
```js
JSON.parse(localStorage.getItem("av_impact_leads") || "[]")
```

---

## Production Checklist

Before deploying:

- [ ] `npm run lint` → 0 TypeScript errors
- [ ] `npm run build` → builds successfully, check bundle sizes
- [ ] All images use `.webp` format (no `.png` files in `public/assets/`)
- [ ] All interactive elements are keyboard accessible
- [ ] All pages call `useSEO(path)` with the correct route
- [ ] `sanitizeString()` applied to all user inputs before storage
- [ ] No `alert()` calls in production code (use inline error states)
- [ ] Console is free of errors on all pages
