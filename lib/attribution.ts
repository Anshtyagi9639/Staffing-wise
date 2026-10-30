/**
 * Campaign attribution for enquiries. On the first page of a visit, the UTM parameters (and gclid presence) and the
 * landing page are kept in sessionStorage for that browser tab only. They are sent with an enquiry the visitor chooses
 * to submit, so the team can see which campaign produced the lead. Nothing is sent to analytics from here,
 * and no personal data is ever placed in URLs.
 */
const KEY = "sw_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landing_page?: string; gclid_present?: "yes" };

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(location.search);
    const data: Attribution = { landing_page: location.pathname };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 100);
    }
    if (params.has("gclid")) data.gclid_present = "yes";
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable (private mode): attribution is optional */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
