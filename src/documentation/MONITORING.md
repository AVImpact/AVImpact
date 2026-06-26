# AV Impact — Production Monitoring Guide

## Sentry Error Monitoring

### Overview

Sentry captures runtime exceptions, React component crashes, unhandled promise rejections, and API request failures in production. It is **environment-aware** — it only activates when `VITE_SENTRY_DSN` is set and the app is running in production mode.

### Setup Steps

1. **Create a Sentry account**: https://sentry.io (free tier is sufficient for AV Impact's traffic)
2. **Create a new project**: Platform → React (JavaScript)
3. **Copy your DSN**: Project Settings → Client Keys → DSN
4. **Add to your deployment environment**:
   ```
   VITE_SENTRY_DSN=https://xxxxx@o123456.ingest.sentry.io/123456
   VITE_APP_VERSION=1.0.0
   ```
5. **Do NOT add to `.env`** (gitignored) — add directly to your hosting panel's environment variables (Vercel, Netlify, AWS, etc.)

### Configuration Details

| Setting | Value | Notes |
|---|---|---|
| `enabled` | `false` in dev, `true` in prod | Prevents dev noise from polluting production |
| `tracesSampleRate` | `0` in dev, `1.0` in prod | 100% of transactions tracked in production |
| `environment` | `"development"` or `"production"` | Set automatically from Vite's `import.meta.env.DEV` |

### Events Captured

| Event Type | Captured By |
|---|---|
| Runtime JavaScript exceptions | Sentry global error handler |
| React component crashes | `ErrorBoundary.onError` → `captureError()` |
| Unhandled promise rejections | `browserTracingIntegration()` |
| API request failures | Web3Forms errors logged via `console.error` (captured by Sentry) |

### Error Boundary Integration

The following components are wrapped in `<ErrorBoundary onError={captureError}>`:

| Boundary | Location | Scope |
|---|---|---|
| App-level | `App.tsx` | Catches any page-level crash |
| Solution Advisor | `BrandsProducts/index.tsx` | Section-level isolation |
| Room Visualizer | `BrandsProducts/index.tsx` | Section-level isolation |
| Room Configurator | `BrandsProducts/index.tsx` | Section-level isolation |
| Brand Explorer | `BrandsProducts/index.tsx` | Section-level isolation |

### Implementation Files

- **Init module**: `src/lib/sentry.ts`
- **Entry point**: `src/main.tsx` — `initSentry()` called before `createRoot()`
- **Boundary integration**: `src/components/ErrorBoundary.tsx`
- **Manual capture**: `captureError(error, context?)` from `src/lib/sentry.ts`

---

## Google Analytics 4

### Property ID

`G-401BSXDY5N` — loaded in `index.html` via `gtag.js`

### Centralized Events

All custom events are managed from `src/utils/analyticsEvents.ts`.

| Function | GA4 Event Name | Trigger |
|---|---|---|
| `trackEvent.contactFormOpen(type)` | `contact_form_open` | Modal opens |
| `trackEvent.contactFormSubmit(type, space)` | `contact_form_submit` | Successful form submission |
| `trackEvent.consultationRequest(source)` | `consultation_request` | Consultation CTA clicked |
| `trackEvent.quoteRequest(source)` | `quote_request` | Quote form submitted |
| `trackEvent.solutionDesignerUsage(spaceType)` | `solution_designer_usage` | Space type selected in LeadModal |
| `trackEvent.solutionDesignerComplete(space, size)` | `solution_designer_complete` | Step 3 form submitted |
| `trackEvent.ctaClick(label, location)` | `cta_click` | Primary CTA button click |
| `trackEvent.socialMediaClick(platform)` | `social_media_click` | Social link click in Footer |
| `trackEvent.companyProfileDownload()` | `company_profile_download` | PDF download button click |
| `trackEvent.pageView(path, title)` | `page_view` | SPA route change |

### Where to View Reports

GA4 Dashboard → `https://analytics.google.com` → Reports → Events

---

## Adding Microsoft Clarity (Optional)

If you want session recordings and heatmaps in addition to GA4:

1. Sign up at https://clarity.microsoft.com
2. Get your Clarity project ID
3. Add this snippet to `index.html` just before `</head>`:

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
</script>
```

No code changes required in the React app — Clarity auto-captures interactions.
