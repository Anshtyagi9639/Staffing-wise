import type { Photo } from "@/lib/content/images";
import type { ServiceKey } from "@/lib/site";

export const blogCategories = ["Customs clearance", "Staffing & outsourcing", "Finance & administration"] as const;
export type BlogCategory = (typeof blogCategories)[number];

/**
 * One blog article. Content is written in a small Markdown subset (see lib/blog/markdown.tsx):
 * "## " and "### " headings, paragraphs, "- " and "1. " lists, "> " callouts, pipe tables, **bold** and [links](/path).
 */
export type BlogPost = {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title> tag, at most about 65 characters including " | Staffing Wise". */
  seoTitle: string;
  /** Meta description, at most 160 characters. */
  description: string;
  /** Card and listing summary. */
  excerpt: string;
  category: BlogCategory;
  /** Search intent this article owns (docs/blog-content-plan.md). Not displayed. */
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** ISO dates. Set datePublished to the real go-live date before launch (docs/blog-content-plan.md). */
  datePublished: string;
  dateModified: string;
  cover: Photo;
  /** Two to four sentences that answer the article's question directly, shown first (answer-engine friendly). */
  summary: string[];
  body: string;
  /** Service pages this article supports, linked in the sidebar and closing CTA. */
  services: ServiceKey[];
  /** Hand-picked related article slugs, shown before same-category fallbacks. */
  related: string[];
  featured?: boolean;
};
