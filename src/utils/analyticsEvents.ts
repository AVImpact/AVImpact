/**
 * analyticsEvents.ts
 * ==================
 * Centralized Google Analytics 4 event tracking for AV Impact.
 *
 * GA4 property: G-401BSXDY5N (loaded in index.html via gtag.js)
 *
 * Usage:
 *   import { trackEvent } from "../utils/analyticsEvents";
 *   trackEvent.ctaClick({ label: "Request Consultation" });
 *
 * All functions are safe to call even if GA4 is not loaded (they no-op silently).
 */

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  action: string,
  params?: Record<string, unknown>
) => void;

function gtag(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof g !== "function") return;
  g("event", action, params);
}

// ---------------------------------------------------------------------------
// Event Tracking Functions
// ---------------------------------------------------------------------------

export const trackEvent = {
  /**
   * Fired when the LeadModal (AV Consultation Assistant) opens.
   * @param type - "quotation" | "sales" | "scroll-email"
   */
  contactFormOpen(type: string) {
    gtag("contact_form_open", {
      modal_type: type,
    });
  },

  /**
   * Fired when a lead form is successfully submitted.
   * @param type - "quotation" | "sales" | "scroll-email"
   * @param spaceType - optional room/space type selected by the user
   */
  contactFormSubmit(type: string, spaceType?: string) {
    gtag("contact_form_submit", {
      modal_type: type,
      space_type: spaceType || "not_specified",
    });
  },

  /**
   * Fired when a consultation modal is triggered via a CTA button.
   */
  consultationRequest(source: string) {
    gtag("consultation_request", {
      source,
    });
  },

  /**
   * Fired when a quote/BOM request form is submitted.
   */
  quoteRequest(source: string) {
    gtag("quote_request", {
      source,
    });
  },

  /**
   * Fired when a user selects a space type in the Solution Designer / LeadModal.
   * Signals meaningful engagement with the tool.
   */
  solutionDesignerUsage(spaceType: string) {
    gtag("solution_designer_usage", {
      space_type: spaceType,
    });
  },

  /**
   * Fired when the user completes all 3 steps of the Solution Designer
   * and submits the consultation form.
   */
  solutionDesignerComplete(spaceType: string, roomSize: string) {
    gtag("solution_designer_complete", {
      space_type: spaceType,
      room_size: roomSize,
    });
  },

  /**
   * Fired when any primary CTA button is clicked across the site.
   * @param label - human-readable button label (e.g. "Explore Solutions")
   * @param location - page or section where the click occurred
   */
  ctaClick(label: string, location?: string) {
    gtag("cta_click", {
      cta_label: label,
      cta_location: location || "unknown",
    });
  },

  /**
   * Fired when a social media link is clicked in the Footer.
   * @param platform - "linkedin" | "instagram" | "whatsapp" | etc.
   */
  socialMediaClick(platform: string) {
    gtag("social_media_click", {
      platform,
    });
  },

  /**
   * Fired when the floating Company Profile PDF download button is clicked.
   */
  companyProfileDownload() {
    gtag("company_profile_download", {
      file_name: "AVIMPACT_Company_Profile.pdf",
    });
  },

  /**
   * Fired when a user navigates between pages (supplement to automatic GA4 page_view).
   * Useful for SPA route tracking if automatic collection is not fully enabled.
   */
  pageView(path: string, title: string) {
    gtag("page_view", {
      page_path: path,
      page_title: title,
    });
  },
};
