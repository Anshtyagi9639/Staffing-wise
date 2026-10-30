import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogCardData } from "@/lib/blog";
import { photoProps } from "@/lib/content/images";
import { cn } from "@/lib/utils/cn";

/** Article card for the blog listing, related articles and service pages. The whole card is one link target. */
export function BlogCard({ post, headingLevel = "h3", className }: { post: BlogCardData; headingLevel?: "h2" | "h3"; className?: string }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-brand border border-line bg-white transition-shadow hover:shadow-card", className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <Image
          {...photoProps(post.cover)} alt=""
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] font-bold text-navy-900">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5.5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-ink-soft">
          <time dateTime={post.datePublished}>{post.dateLabel}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-3.5" /> {post.minutes} min read
          </span>
        </p>
        <Heading className="mt-2 text-[1.32rem] leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2.5 flex-1 text-[0.97rem] text-ink-soft">{post.excerpt}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-800">
          Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
