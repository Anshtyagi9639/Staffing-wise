import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  /** Full <title>. Titles are written per page for search intent (docs/keyword-map.md), so no template is applied. */
  title: string;
  description: string;
  path: `/${string}`;
  /** Optional page-specific share image; defaults to the site Open Graph image. */
  image?: { src: string; alt: string };
  noindex?: boolean;
  /** Blog articles: Open Graph type "article" with dates, section and tags. */
  article?: { publishedTime: string; modifiedTime: string; section: string; tags: string[] };
};

export function buildMetadata({ title, description, path, image, noindex, article }: PageMetaInput): Metadata {
  // Always set an image: a page-level openGraph object replaces the file-based default from app/opengraph-image.png.
  const images = image ? [{ url: image.src, alt: image.alt }] : [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Staffing Wise, outsourcing made simple" }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: article
      ? { type: "article", url: path, title, description, siteName: site.name, locale: "en_IE", images, authors: [site.name], ...article }
      : { type: "website", url: path, title, description, siteName: site.name, locale: "en_IE", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
