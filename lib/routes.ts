import type { MetadataRoute } from "next";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * Public, indexable, canonical pages. The single source for sitemap.xml and llms.txt.
 * Only add a page here when it is live, returns 200, is not redirected and has its own canonical URL.
 */
export const publicRoutes: { path: string; title: string; summary: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", title: "Home", summary: "Dedicated, trained overseas staff for freight forwarders, customs agents, hauliers and logistics companies.", priority: 1, changeFrequency: "monthly" },
  {
    path: "/customs-clearance-staffing",
    title: "Customs Clearance Staffing",
    summary: "Dedicated customs-clearance staff who support import and export declaration processing for customs agents and freight forwarders in Ireland and the UK.",
    priority: 0.95,
    changeFrequency: "monthly",
  },
  {
    path: "/accounting-finance-support",
    title: "Accounting & Finance Support",
    summary: "Dedicated staff for invoice processing, bookkeeping support, reconciliations and routine finance administration.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/administration-business-support",
    title: "Administration & Business Support",
    summary: "Dedicated staff for data entry, order processing, document handling, customer service and other back-office tasks.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/how-it-works", title: "How It Works", summary: "The four-step Staffing Wise model and how responsibilities are shared with the client.", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", title: "Industries We Support", summary: "How dedicated staff support freight forwarders, customs agents, hauliers and logistics companies.", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-us", title: "About Us", summary: "Who Staffing Wise is, its approach, and where it works.", priority: 0.6, changeFrequency: "yearly" },
  { path: "/faqs", title: "FAQs", summary: "Answers about the dedicated staffing model and customs-clearance placements.", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", title: "Blog", summary: "Guides on customs clearance outsourcing, dedicated staff and outsourced finance and administration support.", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact-us", title: "Contact Us", summary: "Enquiry form, phone and email for discussing staffing requirements.", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy-notice", title: "Privacy Notice", summary: "How personal data submitted through the website is used.", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie-policy", title: "Cookie Policy", summary: "Cookies used on the website and how to change your choices.", priority: 0.2, changeFrequency: "yearly" },
];
