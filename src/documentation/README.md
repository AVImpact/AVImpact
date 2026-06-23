# AV Impact Website

> **Better Connections. Better Decisions. Better Results.**

A production-ready, premium corporate website for **AV Impact** — a professional Audio-Visual solutions and integration company based in Indore, India. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| Animation | CSS animations + Motion |
| Fonts | Inter (Google Fonts) |

---

## Project Structure

See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for full folder and file responsibility map.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install Dependencies

```bash
npm install
```

---

## Run Instructions

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

> Hot Module Replacement (HMR) is enabled by default. Set `DISABLE_HMR=true` in your environment to disable it.

---

## Build Instructions

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Lint / Type Check

```bash
npm run lint
```

Runs TypeScript compiler in `noEmit` mode to catch type errors without producing output.

---

## Deployment Instructions

The `dist/` output is a standard static site bundle and can be deployed to:

- **Vercel** — connect your GitHub repo, set build command to `npm run build`, output directory to `dist`
- **Netlify** — same as above
- **AWS S3 + CloudFront** — upload `dist/` to an S3 bucket configured for static website hosting
- **Nginx** — serve the `dist/` directory as a static root; configure `try_files $uri /index.html` for SPA routing

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, solutions overview, industries, stats, and CTA |
| `/solutions` | Solutions | Detailed AV solution categories |
| `/projects` | Projects | Portfolio of completed client projects |
| `/brands-products` | Brands & Products | All hardware brands and product lines |
| `/industries` | Industries | Industry-specific AV deployments |
| `/careers` | Careers | Open positions and company culture |
| `/contact` | Contact | Contact form, location, and office info |
| `/about` | About | Company history, team, and mission |
| `/company-profile` | Company Profile | Printable/downloadable PDF brochure |

---

## Key Features

- 🖨️ **Print-to-PDF brochure** — `/company-profile` renders an 8-page A4 brochure with full print media query support
- 📱 **Responsive design** — mobile-first layouts across all pages
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, `focus-visible` styles
- ⚡ **Code splitting** — all pages are lazy-loaded via `React.lazy` + `Suspense`
- 🎨 **Design system** — centralized CSS custom properties for colors, typography, and spacing in `src/index.css`
- 💬 **Lead capture modal** — global `<LeadModal>` triggered via `CustomEvent` from any CTA button

---

## Contact

**AV Impact**  
101, Balaji Heights, Geeta Bhawan, Indore M.P, India 452001  
📞 +91 9685453058  
✉️ sales@avimpact.in

