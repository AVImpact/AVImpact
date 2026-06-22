# Page Map

All routes, user flows, and major sections for the AV Impact website.

---

## Route Overview

| Route | Page File | Description |
|-------|-----------|-------------|
| `/` | `Home.tsx` | Primary landing page |
| `/solutions` | `Solutions.tsx` | AV solution categories |
| `/projects` | `Projects.tsx` | Portfolio |
| `/brands-products` | `BrandsProducts.tsx` | Hardware brands & products |
| `/industries` | `Industries.tsx` | Industry-specific deployments |
| `/careers` | `Careers.tsx` | Jobs and culture |
| `/contact` | `Contact.tsx` | Contact information and form |
| `/about` | `About.tsx` | Company story and team |
| `/company-profile` | `CompanyProfile.tsx` | Printable A4 brochure |
| `/*` | — | Redirects to `/` |

---

## Page Details

---

### Home — `/`

**Purpose:** Primary marketing landing page. Converts first-time visitors into qualified leads.

**User Flow:**
1. User lands on hero section → CTA "Explore Solutions" or "Get a Consultation"
2. Scrolls through solution categories preview
3. Views trust metrics / stats
4. Sees industries carousel
5. Lands on CTA section → dispatches `open-av-modal` event

**Major Sections:**
- **Hero** — Full-viewport animated headline with `NetworkBackground`, dual CTAs, scroll indicator
- **Solutions Overview** — Card grid of 8 AV solution types
- **Ecosystem Diagram** — Interactive AV tech relationship visualization
- **Trust Metrics** — Animated `CountUpNumber` + `ProgressRing` stats
- **Partner Brands Marquee** — Infinite horizontal scroll of brand logos via `BrandLogo`
- **Industries Preview** — Quick-view cards for 6 key industries
- **Process Steps** — 5-step timeline (Consult → Design → Integrate → Train → Support)
- **CTA Banner** — Full-width consultation call-to-action

---

### Solutions — `/solutions`

**Purpose:** Detailed showcase of AV solution categories to educate prospects on capabilities.

**User Flow:**
1. User arrives from Home page CTA or nav link
2. Views filterable solution category grid
3. Clicks a category → expands detail panel
4. CTA to request a specific solution → opens modal

**Major Sections:**
- **Hero** — Solution category headline with `NetworkBackground`
- **Solution Cards** — Expandable cards per category with specs and use cases
- **CTA** — "Request This Solution" modal trigger

---

### Projects — `/projects`

**Purpose:** Build credibility through completed project portfolio.

**User Flow:**
1. User arrives from nav or Home
2. Filters projects by industry or type
3. Clicks a project → modal/expanded view with `AnimatedMetric` stats
4. CTA to start a similar project

**Major Sections:**
- **Hero** — Portfolio headline
- **Project Grid** — Filterable cards with project images, client, and type
- **Project Detail** — Expanded view with animated metrics
- **CTA** — "Start Your Project" consultation trigger

---

### Brands & Products — `/brands-products`

**Purpose:** Showcase all hardware partner brands and their product lines.

**User Flow:**
1. User searches for a specific brand or product type
2. Browses brand logos via `BrandLogo` component
3. Views product categories and sub-products
4. CTA to request a quote for specific products

**Major Sections:**
- **Hero** — Brands headline with `NetworkBackground`
- **Brand Logo Grid** — All partner brands with `CountUpNumber` stats
- **Product Categories** — Expandable category cards with product lists
- **CTA** — "Request a Quote" modal trigger

---

### Industries — `/industries`

**Purpose:** Demonstrate domain expertise across key industry verticals.

**User Flow:**
1. User lands from nav dropdown or Home industries section
2. Browses industry cards with anchor navigation (e.g. `#corporate`)
3. Views industry-specific solutions and case study snippets
4. CTA to discuss their specific industry

**Industry Anchors:**
- `#corporate` — Corporate offices and boardrooms
- `#education` — Schools, universities, lecture halls
- `#healthcare` — Hospitals, telemedicine rooms
- `#government` — Government facilities, command centers
- `#hospitality` — Hotels, ballrooms, event spaces
- `#manufacturing` — Factory floors, operations panels

---

### Careers — `/careers`

**Purpose:** Attract talent by showcasing company culture and open positions.

**User Flow:**
1. User arrives from footer or direct link
2. Views company culture section
3. Browses open job positions
4. Clicks "Apply" → opens the external Google Form with the job title prefilled

**Major Sections:**
- **Hero** — "Join Our Team" with `NetworkBackground`
- **Culture Section** — Values, work environment, benefits
- **Open Positions** — Job listing cards with role, type, location
- **Application CTA** — Apply buttons open the configured Google Form

---

### Contact — `/contact`

**Purpose:** Provide all contact channels and a direct inquiry form.

**User Flow:**
1. User arrives from nav, footer, or any CTA
2. Views contact information (phone, email, address)
3. Fills out the inquiry form
4. Submits → confirmation message

**Major Sections:**
- **Hero** — "Get In Touch" with `NetworkBackground`
- **Contact Info Cards** — Phone, email, address, business hours
- **Inquiry Form** — Name, company, email, phone, requirement
- **Map / Location** — Address and region info

---

### About — `/about`

**Purpose:** Build trust by telling the company story, mission, and team.

**User Flow:**
1. User arrives from footer or nav
2. Reads company history and founding story
3. Views team and certifications
4. CTA to work with AV Impact

**Major Sections:**
- **Hero** — Company name and founding headline
- **Our Story** — History and founding narrative
- **Mission & Values** — Core principles
- **Team** — Key team members
- **Certifications** — Industry credentials and partner certifications

---

### Company Profile — `/company-profile`

**Purpose:** Professional 8-page printable corporate brochure for client/enterprise presentations.

**User Flow:**
1. User clicks the floating download button (bottom-right on any page) or navigates directly
2. Views brochure in browser (scrollable A4 pages)
3. Clicks "Download PDF" → `window.print()` opens browser print dialog
4. User selects "Save as PDF" to generate the file

**Brochure Pages:**
| Page | Content |
|------|---------|
| 01 | Cover — Company name, logo, tagline |
| 02 | Display & Projection Solutions |
| 03 | Conferencing & Collaboration |
| 04 | Audio & Control Solutions |
| 05 | Infrastructure & Distribution |
| 06 | Industries We Serve |
| 07 | Our Process & Commitment |
| 08 | Contact & Technology Partners |

**Technical Notes:**
- Uses `.a4-page` CSS class enforcing exact 210mm × 297mm A4 dimensions
- `@media print` in `index.css` hides all non-brochure UI
- Floating download button in `App.tsx` is globally visible (`no-print` class hides it during print)
