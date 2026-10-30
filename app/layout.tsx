import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";
import { TrackingScripts } from "@/components/analytics/tracking-scripts";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { JsonLd } from "@/components/ui/json-ld";
import { consentDefaultsScript } from "@/lib/consent";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data/schemas";
import { hasAnalyticsTools, hasMarketingTools, tracking } from "@/lib/tracking-config";
import "./globals.css";

/* Oswald (SIL OFL) echoes the condensed "WISE" in the logo and the sister brand's display face. */
const oswald = localFont({
  src: "./fonts/Oswald-Variable.woff2",
  variable: "--font-oswald",
  weight: "200 700",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

/* Inter (SIL OFL) for body copy and interface text. */
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Staffing Wise | Dedicated Staff for Freight Forwarders & Customs Agents", template: "%s | Staffing Wise" },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  // Only the production deployment may be indexed; previews and staging are noindex (robots.txt also disallows them).
  robots: site.isProduction ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } } : { index: false, follow: false },
  verification: {
    ...(tracking.googleSiteVerification ? { google: tracking.googleSiteVerification } : {}),
    ...(tracking.bingSiteVerification ? { other: { "msvalidate.01": tracking.bingSiteVerification } } : {}),
  },
  openGraph: { siteName: site.name, locale: "en_IE", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#09333f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hasTools = hasAnalyticsTools || hasMarketingTools;
  return (
    <html lang="en-IE" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        {/* Consent Mode v2 defaults (all denied) before any Google tag can load. Loads no third-party code itself. */}
        {hasTools ? <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} /> : null}
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-brand bg-sun px-4 py-2.5 font-bold text-navy-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        {hasTools ? (
          <>
            <CookieConsent hasAnalytics={hasAnalyticsTools} hasMarketing={hasMarketingTools} />
            <TrackingScripts />
          </>
        ) : null}
        <AnalyticsListener />
        <RevealObserver />
      </body>
    </html>
  );
}
