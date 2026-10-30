import { plainText } from "./markdown";
import { post as choosingPartner } from "./posts/choosing-customs-clearance-outsourcing-partner";
import { post as outsourcingGuide } from "./posts/customs-clearance-outsourcing-guide";
import { post as dedicatedCustoms } from "./posts/dedicated-customs-clearance-staff";
import { post as offshore } from "./posts/dedicated-offshore-staffing";
import { post as forwarderCapacity } from "./posts/freight-forwarder-operational-capacity";
import { post as volumes } from "./posts/managing-customs-declaration-volumes";
import { post as finance } from "./posts/outsourced-accounting-finance-staff";
import { post as ukIreland } from "./posts/outsourced-customs-staff-uk-ireland";
import { post as vsInHouse } from "./posts/outsourcing-vs-in-house-recruitment";
import { post as admin } from "./posts/when-to-outsource-administrative-support";
import type { BlogPost } from "./types";

export type { BlogCategory, BlogPost } from "./types";
export { blogCategories } from "./types";

/** To publish a new article: add a file in lib/blog/posts/ and list it here. Order is decided by date, then this list. */
const all: BlogPost[] = [outsourcingGuide, dedicatedCustoms, volumes, vsInHouse, ukIreland, choosingPartner, offshore, admin, finance, forwarderCapacity];

export const posts: BlogPost[] = all
  .map((p, i) => ({ p, i }))
  .sort((a, b) => b.p.datePublished.localeCompare(a.p.datePublished) || a.i - b.i)
  .map(({ p }) => p);

const bySlug = new Map(posts.map((p) => [p.slug, p]));
if (bySlug.size !== posts.length) throw new Error("Duplicate blog slug");

export function getPost(slug: string) {
  return bySlug.get(slug);
}

export function featuredPost() {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function readingMinutes(p: BlogPost) {
  const words = plainText([...p.summary, p.body].join(" ")).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Hand-picked related articles first, then others in the same category, then the newest. */
export function relatedPosts(p: BlogPost, count = 3) {
  const picked = p.related.map((s) => bySlug.get(s)).filter((x): x is BlogPost => !!x);
  const rest = posts.filter((x) => x.slug !== p.slug && !picked.includes(x));
  const sameCategory = rest.filter((x) => x.category === p.category);
  return [...new Set([...picked, ...sameCategory, ...rest])].slice(0, count);
}

/** Articles that support a given service page, newest first. */
export function postsForService(service: BlogPost["services"][number], count = 3) {
  const matching = posts.filter((p) => p.services.includes(service));
  return [...matching.filter((p) => p.services[0] === service), ...matching.filter((p) => p.services[0] !== service)].slice(0, count);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

/** Lightweight card data for client components (keeps article bodies out of the browser bundle). */
export type BlogCardData = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "datePublished" | "cover"> & {
  minutes: number;
  dateLabel: string;
  /** Lower-case text the listing search matches against: title, excerpt, description, category and topic keywords. */
  searchText: string;
};

export function toCard(p: BlogPost): BlogCardData {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    datePublished: p.datePublished,
    cover: p.cover,
    minutes: readingMinutes(p),
    dateLabel: formatDate(p.datePublished),
    searchText: [p.title, p.excerpt, p.description, p.category, p.primaryKeyword, ...p.secondaryKeywords].join(" ").toLowerCase(),
  };
}
