import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { publicRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publicRoutes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: r.changeFrequency, priority: r.priority }));
  const articles = posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.dateModified, changeFrequency: "yearly" as const, priority: 0.6 }));
  return [...pages, ...articles];
}
