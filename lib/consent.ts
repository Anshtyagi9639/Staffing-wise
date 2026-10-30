// Cookie consent state (client side). Analytics and marketing tags only load after the visitor opts in.

export const CONSENT_COOKIE = "sw_consent";
export const CONSENT_EVENT = "sw:consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "sw:open-cookie-settings";
const MAX_AGE_DAYS = 180;

export type Consent = { analytics: boolean; marketing: boolean; v: 1; ts: number };

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    lintrk?: (action: string, data: Record<string, unknown>) => void;
  }
}

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)));
    if (parsed && parsed.v === 1) return { analytics: !!parsed.analytics, marketing: !!parsed.marketing, v: 1, ts: Number(parsed.ts) || 0 };
  } catch {
    /* malformed cookie: treat as no choice */
  }
  return null;
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }) {
  const consent: Consent = { ...choice, v: 1, ts: Date.now() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  window.gtag?.("consent", "update", consentModeState(consent));
  window.dataLayer?.push({ event: "consent_update", analytics_consent: consent.analytics, marketing_consent: consent.marketing });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function consentModeState(c: { analytics: boolean; marketing: boolean }) {
  const ads = c.marketing ? "granted" : "denied";
  return { analytics_storage: c.analytics ? "granted" : "denied", ad_storage: ads, ad_user_data: ads, ad_personalization: ads };
}

/**
 * Inline <head> script: Google Consent Mode v2 defaults (everything denied) and restores a stored choice before any
 * Google tag can load. Server-rendered so it always runs first. It defines gtag/dataLayer but loads no third-party code.
 */
export const consentDefaultsScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);
try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]+)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));var a=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:a,ad_user_data:a,ad_personalization:a});}}catch(e){}`;
