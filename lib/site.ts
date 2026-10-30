/**
 * Staffing Wise business information.
 * Sources: "Staffing Wise Website Content & Structure" (client document, docs/source-content.md) and the contact
 * details published on the current www.staffingwise.ie homepage (fetched 30 Oct 2026).
 * Anything not in those sources is listed in docs/client-questions.md and must not be added here until confirmed.
 */

const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV ?? "development";

export const site = {
  name: "Staffing Wise",
  tagline: "Outsourcing made simple",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.staffingwise.ie").replace(/\/$/, ""),
  /** Only "production" may be indexed. Previews, staging and local builds send noindex and disallow crawling. */
  isProduction: siteEnv === "production",
  description:
    "Staffing Wise helps freight forwarders, customs agents, hauliers and logistics companies build dedicated teams of trained overseas professionals who work exclusively for each client as an extension of its existing operation.",
  /** Published on the current staffingwise.ie homepage ("Tel: 01 9120250"). Used for every tel: link, including the navbar icon. */
  phone: { display: "01 912 0250", international: "+353 1 912 0250", href: "tel:+35319120250", e164: "+35319120250" },
  email: "info@staffingwise.ie",
  linkedin: "https://www.linkedin.com/company/staffing-wise-cw/",
  /** Initial target markets (client document, section 15). Do not add countries until confirmed. */
  markets: ["Ireland", "United Kingdom"],
  audience: ["Freight forwarders", "Customs agents", "Hauliers", "Logistics companies"],
} as const;

/** Offices as listed on the current staffingwise.ie homepage. Confirm before launch (docs/client-questions.md). */
export const offices = [
  {
    label: "Dublin",
    lines: ["Unit B4 Centrepoint", "Rosemount Industrial Estate", "Ballycoolin, Dublin 11", "Ireland"],
    street: "Unit B4 Centrepoint, Rosemount Industrial Estate, Ballycoolin",
    locality: "Dublin 11",
    countryCode: "IE",
  },
  {
    label: "Gurugram",
    lines: ["91 Springboard, 21-B", "Udyog Vihar, Sector 18", "Gurugram, Haryana 122008", "India"],
    street: "91 Springboard, 21-B, Udyog Vihar, Sector 18",
    locality: "Gurugram",
    region: "Haryana",
    postalCode: "122008",
    countryCode: "IN",
  },
] as const;

export type ServiceKey = "customs" | "finance" | "admin";

export type Service = {
  key: ServiceKey;
  name: string;
  shortName: string;
  path: `/${string}`;
  summary: string;
};

export const services: Record<ServiceKey, Service> = {
  customs: {
    key: "customs",
    name: "Customs Clearance Staffing",
    shortName: "Customs Clearance",
    path: "/customs-clearance-staffing",
    summary: "Specialist staffing support for customs agents, freight forwarders and logistics businesses.",
  },
  finance: {
    key: "finance",
    name: "Accounting & Finance Support",
    shortName: "Accounting & Finance",
    path: "/accounting-finance-support",
    summary:
      "Dedicated support for appropriate bookkeeping, accounts administration, invoice processing, reconciliations and other routine finance tasks, depending on your requirements and the individual’s training.",
  },
  admin: {
    key: "admin",
    name: "Administration & Business Support",
    shortName: "Administration",
    path: "/administration-business-support",
    summary:
      "Reliable support for data entry, order processing, document handling, customer service and other suitable back-office activities.",
  },
};

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = { kind: "link"; label: string; href: string } | { kind: "menu"; label: string; href: string; items: NavLink[] };

export const mainNav: NavItem[] = [
  {
    kind: "menu",
    label: "Services",
    href: "/customs-clearance-staffing",
    items: [
      { label: services.customs.name, href: services.customs.path, description: "Our specialist service for customs agents and freight forwarders." },
      { label: services.finance.name, href: services.finance.path, description: "Bookkeeping support, invoice processing and finance administration." },
      { label: services.admin.name, href: services.admin.path, description: "Data entry, order processing, customer service and back-office tasks." },
    ],
  },
  { kind: "link", label: "How It Works", href: "/how-it-works" },
  { kind: "link", label: "Industries", href: "/industries" },
  { kind: "link", label: "About Us", href: "/about-us" },
  { kind: "link", label: "FAQs", href: "/faqs" },
  { kind: "link", label: "Blog", href: "/blog" },
];

export const primaryCta = { label: "Discuss Your Requirements", href: "/contact-us" } as const;

export const footerNav = {
  services: [services.customs, services.finance, services.admin].map((s) => ({ label: s.name, href: s.path })),
  company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Industries We Support", href: "/industries" },
    { label: "About Us", href: "/about-us" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  legal: [
    { label: "Privacy Notice", href: "/privacy-notice" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export function absoluteUrl(path = "/") {
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}
