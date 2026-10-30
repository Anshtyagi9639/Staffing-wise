import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { postsForService, toCard } from "@/lib/blog";
import type { ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

/** "From the blog" strip for service pages: the newest articles supporting that service. */
export function FromTheBlog({ service, title = "From the blog", className }: { service: ServiceKey; title?: string; className?: string }) {
  const items = postsForService(service).map(toCard);
  if (!items.length) return null;
  const id = `blog-${service}`;
  return (
    <section aria-labelledby={id} className={cn("py-18 lg:py-24", className)}>
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id={id} eyebrow="Guides and insights" title={title} />
          <Link href="/blog" className="link-inline inline-flex shrink-0 items-center gap-1.5">
            All articles <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
