# Component Map

All major components in the AV Impact website, their purpose, props, and dependencies.

---

## Layout Components

### `Navbar` — `src/components/Navbar.tsx`
**Purpose:** Sticky top navigation bar present on every page.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `currentPath` | `string` | Active route path for highlighting the active link |
| `navigate` | `(path: string) => void` | Navigation callback from App.tsx |
| `activeSection` | `string?` | Currently active scroll section (for home page) |

**Features:**
- Desktop nav with Industries mega-dropdown
- Mobile drawer menu
- "Consultation" CTA button opens `<LeadModal>` via CustomEvent
- Active link highlighting via `nav-underline-active` CSS class

**Dependencies:** `AVImpactLogo`, `NAV_INDUSTRIES` (from constants), Lucide icons

---

### `Footer` — `src/components/Footer.tsx`
**Purpose:** Global site footer rendered at the bottom of every page.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `navigate` | `(path: string) => void` | Navigation callback |

**Sections:**
1. Full-width CTA banner with background image
2. Trust indicators horizontal strip
3. Three-column layout (Brand / Quick Links with hover panels / Contact)
4. Bottom legal/copyright bar

**Dependencies:** `AVImpactLogo`, `FOOTER_SOLUTIONS`, `FOOTER_INDUSTRIES`, `FOOTER_TRUST_INDICATORS` (from constants), Lucide icons

---

## Brand & Logo Components

### `AVImpactLogo` — `src/components/AVImpactLogo.tsx`
**Purpose:** Renders the AV Impact logo. Attempts to load the PNG from `/assets/logo.png`, falls back to `/logo.png`, then renders a pixel-perfect inline SVG fallback.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes |
| `height` | `number \| string` | `40` | Image height in px |
| `light` | `boolean` | `false` | Light mode variant (unused currently) |

**Used in:** `Navbar`, `Footer`, `CompanyProfile`

---

### `BrandLogo` — `src/components/BrandLogo.tsx`
**Purpose:** Renders a hardware brand logo by name. Supports text rendering with brand-specific colors as fallback.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Brand name (e.g. "Logitech", "Samsung") |
| `className` | `string` | `""` | Additional CSS classes |
| `isDark` | `boolean` | `false` | Dark background mode |

**Used in:** `Home`, `BrandsProducts`

---

## UI / Utility Components

### `AnimatedMetric` — `src/components/AnimatedMetric.tsx`
**Purpose:** Animates a numeric or text metric value from 0 to target using `requestAnimationFrame` with ease-out timing.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Value string (e.g. `"150+"`, `"99%"`) |
| `duration` | `number` | `1200` | Animation duration in ms |

**Used in:** `Projects`

---

### `CountUpNumber` — `src/components/ui/CountUpNumber.tsx`
**Purpose:** Count-up animation triggered when the element enters the viewport (IntersectionObserver).

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `number` | — | Final count value |
| `duration` | `number` | `1500` | Animation duration in ms |
| `suffix` | `string` | `""` | Suffix appended after number (e.g. `"+"`, `"%"`) |

**Used in:** `Home`, `BrandsProducts`

---

### `ProgressRing` — `src/components/ui/ProgressRing.tsx`
**Purpose:** SVG circular progress ring that animates to a percentage when it enters the viewport.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `percentage` | `number` | Target percentage (0–100) |

**Used in:** `Home`

---

## Background Components

All background components are purely decorative, zero-props SVG/canvas animations.

### `NetworkBackground` — `src/components/backgrounds/NetworkBackground.tsx`
**Purpose:** Animated network node graph (SVG). Used as the hero section background on most pages.

**Used in:** `Home`, `Solutions`, `Projects`, `Industries`, `Contact`, `Careers`, `BrandsProducts`, `About`

---

### `HeroBackground` — `src/components/backgrounds/HeroBackground.tsx`
**Purpose:** Animated gradient/mesh background for hero sections.

**Used in:** Currently unused (preserved for future use)

---

### `WaveBackground` — `src/components/backgrounds/WaveBackground.tsx`
**Purpose:** Animated wave SVG background.

**Used in:** Currently unused (preserved for future use)

---

## Modal Components

### `LeadModal` — `src/components/modals/LeadModal.tsx`
**Purpose:** Global lead capture form modal. Mounted once in `App.tsx`. Listens for `open-av-modal` `CustomEvent` dispatched from any CTA button across the site.

**Event Interface:**
```ts
window.dispatchEvent(new CustomEvent("open-av-modal", { 
  detail: { type: "quotation" | "sales" | "scroll-email" }
}));
```

**Features:**
- Multi-step form
- Phone and email validation
- Requirement type selection
- Sends form data to AV Impact team

**Dependencies:** `LeadFormData` type (from `src/types`)

---

## Constants Reference

### `src/constants/index.ts`

| Export | Used By | Description |
|--------|---------|-------------|
| `NAV_INDUSTRIES` | `Navbar` | 6 industry items for the mega-dropdown |
| `FOOTER_SOLUTIONS` | `Footer` | 8 AV solution types for the solutions popover |
| `FOOTER_INDUSTRIES` | `Footer` | 7 industries for the industries popover |
| `FOOTER_TRUST_INDICATORS` | `Footer` | 5 trust badges in the trust strip |
