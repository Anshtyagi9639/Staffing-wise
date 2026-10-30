/**
 * Public tracking configuration, read from NEXT_PUBLIC_* environment variables at build time.
 * Every ID is format-checked: an empty or malformed value disables that tool rather than loading a broken tag.
 * No IDs are hard-coded. See docs/analytics-and-tracking.md for who owns each tag.
 */
function pick(value: string | undefined, pattern: RegExp) {
  const v = value?.trim();
  return v && pattern.test(v) ? v : undefined;
}

export const tracking = {
  /** Google Tag Manager container. When set, GA4 and ads tags should be configured inside GTM, not here. */
  gtmId: pick(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]{4,12}$/),
  /** GA4 Measurement ID, loaded directly only when no GTM container is configured (prevents double counting). */
  gaId: pick(process.env.NEXT_PUBLIC_GA_ID, /^G-[A-Z0-9]{4,15}$/),
  /** Google Ads conversion tracking for confirmed enquiries (marketing consent only). */
  googleAdsId: pick(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, /^AW-\d{6,14}$/),
  googleAdsEnquiryLabel: pick(process.env.NEXT_PUBLIC_GOOGLE_ADS_ENQUIRY_LABEL, /^[A-Za-z0-9_-]{6,40}$/),
  /** LinkedIn Insight Tag and its enquiry conversion (marketing consent only). */
  linkedInPartnerId: pick(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID, /^\d{4,12}$/),
  linkedInEnquiryConversionId: pick(process.env.NEXT_PUBLIC_LINKEDIN_ENQUIRY_CONVERSION_ID, /^\d{4,12}$/),
  googleSiteVerification: pick(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, /^[A-Za-z0-9_-]{20,80}$/),
  bingSiteVerification: pick(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION, /^[A-F0-9]{20,40}$/i),
};

/**
 * True when any marketing (advertising) tool may run, so the consent banner only asks for what is used.
 * A GTM container counts, because advertising tags may be published inside it.
 */
export const hasMarketingTools = Boolean(tracking.gtmId || tracking.googleAdsId || tracking.linkedInPartnerId);
/** True when any analytics tool is configured. */
export const hasAnalyticsTools = Boolean(tracking.gtmId || tracking.gaId);
