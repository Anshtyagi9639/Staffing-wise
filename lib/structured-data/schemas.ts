import type { Faq } from "@/lib/content/faqs";
import { absoluteUrl, offices, site, type Service } from "@/lib/site";

/**
 * schema.org JSON-LD builders. Only facts shown on the page and published by the client are used.
 * No ratings, reviews, prices or founding dates: none have been supplied or confirmed.
 * Organization (not LocalBusiness): enquiries are handled by phone, email and form, not as a walk-in premises.
 */
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  const [hq] = offices;
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    slogan: site.tagline,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/staffing-wise-logo.png"), width: 782, height: 438 },
    image: absoluteUrl("/opengraph-image.png"),
    description: site.description,
    email: site.email,
    telephone: site.phone.e164,
    areaServed: site.markets.map((name) => ({ "@type": "Country", name })),
    knowsAbout: ["Customs clearance staffing", "Customs declaration processing support", "Dedicated overseas staff", "Back-office outsourcing"],
    address: { "@type": "PostalAddress", streetAddress: hq.street, addressLocality: hq.locality, addressCountry: hq.countryCode },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone.e164,
        email: site.email,
        areaServed: ["IE", "GB"],
        availableLanguage: ["English"],
      },
    ],
    sameAs: [site.linkedin],
  };
}

export function websiteSchema() {
  return { "@type": "WebSite", "@id": websiteId, url: absoluteUrl("/"), name: site.name, publisher: { "@id": orgId }, inLanguage: "en-IE" };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";

export function webPageSchema(path: string, name: string, description: string, type: PageType = "WebPage") {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en-IE",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function serviceSchema(service: Service, description: string, audience: string[]) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.name,
    serviceType: service.name,
    description,
    url: absoluteUrl(service.path),
    provider: { "@id": orgId },
    areaServed: site.markets.map((name) => ({ "@type": "Country", name })),
    audience: audience.map((a) => ({ "@type": "BusinessAudience", audienceType: a })),
  };
}

/**
 * FAQPage markup. Google currently limits FAQ rich results to authoritative government and health sites, so this is
 * not expected to produce a rich result; it is kept because it accurately describes visible content for other consumers.
 */
export function faqSchema(items: Faq[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

/** The blog as a whole, listing its posts. */
export function blogSchema(path: string, items: { url: string; headline: string; datePublished: string }[]) {
  return {
    "@type": "Blog",
    "@id": `${absoluteUrl(path)}#blog`,
    url: absoluteUrl(path),
    name: `${site.name} blog`,
    publisher: { "@id": orgId },
    inLanguage: "en-IE",
    blogPost: items.map((i) => ({ "@type": "BlogPosting", headline: i.headline, url: i.url, datePublished: i.datePublished })),
  };
}

/**
 * One article. Author is the organisation itself (no individual author has been supplied), matching the visible byline.
 * Dates and image match the page; no ratings or invented people.
 */
export function blogPostingSchema(p: {
  path: string;
  headline: string;
  description: string;
  image: { src: string; width: number; height: number };
  datePublished: string;
  dateModified: string;
  section: string;
  keywords: string[];
  wordCount: number;
}) {
  const url = absoluteUrl(p.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.headline,
    description: p.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: { "@type": "ImageObject", url: absoluteUrl(p.image.src), width: p.image.width, height: p.image.height },
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
    articleSection: p.section,
    keywords: p.keywords.join(", "),
    wordCount: p.wordCount,
    inLanguage: "en-IE",
  };
}

export function howToSchema(path: string, name: string, steps: { title: string; body: string }[]) {
  return {
    "@type": "HowTo",
    "@id": `${absoluteUrl(path)}#howto`,
    name,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
  };
}
