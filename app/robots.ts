import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Production: everything public is crawlable, including by search engines' AI features and AI search crawlers, so the
 * business can be described accurately. To opt out of AI model training only, add a rule such as
 * { userAgent: ["GPTBot", "Google-Extended", "CCBot"], disallow: "/" } (see docs/seo-and-aeo.md).
 * Any other environment (preview, staging, local) disallows all crawling.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
