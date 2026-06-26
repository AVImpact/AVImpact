/**
 * Sentry SDK — environment-aware initialization.
 *
 * Set VITE_SENTRY_DSN in your .env file to activate error monitoring.
 * If the DSN is not set the module no-ops silently — the app runs fine.
 *
 * Setup steps:
 *   1. Create a project at https://sentry.io
 *   2. Copy the DSN from Project Settings → Client Keys (DSN)
 *   3. Add VITE_SENTRY_DSN=<your-dsn> to your .env file
 */
import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const isDev = import.meta.env.DEV;

export function initSentry() {
  if (!dsn) {
    if (isDev) {
      console.info("[Sentry] No VITE_SENTRY_DSN set. Monitoring is inactive.");
    }
    return;
  }

  Sentry.init({
    dsn,
    environment: isDev ? "development" : "production",

    // Capture 100% of transactions in production; 0 in development (avoid dev noise)
    tracesSampleRate: isDev ? 0 : 1.0,

    // Do NOT send events during local development unless DSN explicitly set
    enabled: !isDev,

    // Automatically attach release info if set via CI/CD
    release: import.meta.env.VITE_APP_VERSION as string | undefined,

    integrations: [
      // Captures unhandled promise rejections
      Sentry.browserTracingIntegration(),
    ],
  });
}

/**
 * Captures an exception with optional extra context.
 * Safe to call even if Sentry is not initialized.
 */
export function captureError(
  error: Error,
  context?: Record<string, string | number | boolean>
) {
  if (!dsn) return;
  Sentry.withScope((scope) => {
    if (context) {
      scope.setExtras(context as Record<string, unknown>);
    }
    Sentry.captureException(error);
  });
}

export { Sentry };
