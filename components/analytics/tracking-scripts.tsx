"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";
import { tracking } from "@/lib/tracking-config";

/**
 * Loads third-party tags only after the matching consent has been given, and only for IDs that are configured.
 * Ownership (see docs/analytics-and-tracking.md):
 *  - GTM configured: only the GTM container loads here. GA4, Google Ads and LinkedIn are managed inside GTM.
 *  - No GTM: GA4 (analytics consent) and Google Ads / LinkedIn Insight (marketing consent) load directly.
 */
export function TrackingScripts() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    // The consent cookie can only be read in the browser, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    const onChange = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const analytics = !!consent?.analytics;
  const marketing = !!consent?.marketing;
  const { gtmId, gaId, googleAdsId, linkedInPartnerId } = tracking;

  if (gtmId) {
    // GTM itself is loaded once either category is granted; Consent Mode then controls which tags inside it may fire.
    if (!analytics && !marketing) return null;
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
      </Script>
    );
  }

  const loadGtag = (analytics && gaId) || (marketing && googleAdsId);
  const tagForLoader = analytics && gaId ? gaId : googleAdsId;

  return (
    <>
      {loadGtag ? (
        <>
          <Script id="gtag-src" src={`https://www.googletagmanager.com/gtag/js?id=${tagForLoader}`} strategy="afterInteractive" />
          <Script id="gtag-config" strategy="afterInteractive">
            {`gtag('js',new Date());${analytics && gaId ? `gtag('config',${JSON.stringify(gaId)});` : ""}${marketing && googleAdsId ? `gtag('config',${JSON.stringify(googleAdsId)});` : ""}`}
          </Script>
        </>
      ) : null}
      {marketing && linkedInPartnerId ? (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`window._linkedin_partner_id=${JSON.stringify(linkedInPartnerId)};window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      ) : null}
    </>
  );
}
