import type { NextConfig } from "next";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/**
 * Security headers. The Content-Security-Policy restricts framing, plugins, <base> and form targets; it deliberately does
 * not restrict script sources, because Google Tag Manager can load tags the website cannot list in advance.
 * Tighten script-src once the final tag set is known (docs/deployment.md).
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'${isProduction ? "; upgrade-insecure-requests" : ""}`,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }] : []),
  // Non-production deployments (previews, staging) must never be indexed.
  ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
  /**
   * The current staffingwise.ie is a one-page Wix site with a blog. Old URLs are sent to their closest new page.
   * Old Wix posts (/post/...) have no one-to-one replacement yet (decision pending: docs/client-questions.md), so they go
   * to the new blog listing. /blog itself is now a live page and must not be redirected.
   */
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/services", destination: "/customs-clearance-staffing", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/privacy-policy", destination: "/privacy-notice", permanent: true },
      { source: "/post/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
