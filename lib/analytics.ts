// Analytics events. Sent only after the visitor has accepted analytics cookies. Never include personal data
// (names, emails, phone numbers, message text) in event parameters.
import { readConsent } from "@/lib/consent";
import { tracking } from "@/lib/tracking-config";

export type AnalyticsEvents = {
  /** A call-to-action button or link was clicked (elements marked with data-cta). */
  cta_click: { cta_label: string; cta_location: string; link_url?: string };
  /** First interaction with the enquiry form. */
  form_start: { form_name: string; service_of_interest?: string };
  /** The server confirmed the enquiry was delivered (GA4 recommended lead event). */
  generate_lead: { form_name: string; service_of_interest: string; lead_source_page: string };
  /** Validation or delivery failure (no field values sent). */
  form_error: { form_name: string; error_type: "validation" | "delivery" | "rate_limited" };
  phone_click: { link_location: string };
  email_click: { link_location: string };
  outbound_click: { link_url: string; link_domain: string };
  /** A service page was viewed (in addition to the automatic page_view). */
  service_page_view: { service_name: string };
  faq_open: { faq_question: string; faq_location: string };
};

export function track<K extends keyof AnalyticsEvents>(name: K, params: AnalyticsEvents[K]) {
  if (typeof window === "undefined" || !readConsent()?.analytics) return;
  const payload = { ...params, page_path: location.pathname };
  if (tracking.gtmId) {
    // GTM owns the GA4 tags: it reads these dataLayer events (see docs/analytics-and-tracking.md for trigger setup).
    window.dataLayer?.push({ event: name, ...payload });
  } else if (tracking.gaId) {
    window.gtag?.("event", name, payload);
  }
}

/**
 * Advertising conversions for a confirmed enquiry. Only with marketing consent, and only for tags managed in code
 * (with GTM, configure these as GTM tags triggered by the generate_lead event instead).
 */
export function trackEnquiryConversion() {
  if (typeof window === "undefined" || !readConsent()?.marketing || tracking.gtmId) return;
  if (tracking.googleAdsId && tracking.googleAdsEnquiryLabel) {
    window.gtag?.("event", "conversion", { send_to: `${tracking.googleAdsId}/${tracking.googleAdsEnquiryLabel}` });
  }
  if (tracking.linkedInEnquiryConversionId) {
    window.lintrk?.("track", { conversion_id: Number(tracking.linkedInEnquiryConversionId) });
  }
}
