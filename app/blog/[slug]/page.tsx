import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { formatDate, getPost, posts, readingMinutes, relatedPosts, toCard } from "@/lib/blog";
import { headings, Markdown, plainText } from "@/lib/blog/markdown";
import { photoProps } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { services, site } from "@/lib/site";
import { blogPostingSchema, breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

type Props = { params: Promise<{ slug: string }> };

/** Every article is prerendered; unknown slugs return a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.cover,
    article: { publishedTime: post.datePublished, modifiedTime: post.dateModified, section: post.category, tags: [post.primaryKeyword, ...post.secondaryKeywords] },
  });
}

const ctaCopy: Record<string, { title: string; body: string; label: string; query: string }> = {
  customs: {
    title: "Need more customs-processing capacity?",
    body: "Tell us about your declaration volumes, systems and working hours, and we’ll discuss how a dedicated customs staff member could fit into your operation.",
    label: "Discuss Your Customs Staffing Requirements",
    query: "customs",
  },
  finance: {
    title: "Need more capacity in your finance team?",
    body: "Tell us about the finance tasks, systems and experience involved, and we’ll discuss a dedicated placement to support your existing processes.",
    label: "Discuss Your Finance Staffing Requirements",
    query: "finance",
  },
  admin: {
    title: "Ready to free up your team’s time?",
    body: "Tell us which administrative and back-office tasks you would like support with, and we’ll discuss a dedicated placement around your systems.",
    label: "Tell Us What Support You Need",
    query: "admin",
  },
};

export default async function BlogArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const trail = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const minutes = readingMinutes(post);
  const toc = headings(post.body);
  const related = relatedPosts(post).map(toCard);
  const cta = ctaCopy[post.services[0]];
  const wordCount = plainText([...post.summary, post.body].join(" ")).split(/\s+/).filter(Boolean).length;

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(path, post.seoTitle, post.description),
          breadcrumbSchema(trail),
          blogPostingSchema({
            path,
            headline: post.title,
            description: post.description,
            image: post.cover,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            section: post.category,
            keywords: [post.primaryKeyword, ...post.secondaryKeywords],
            wordCount,
          }),
        ]}
      />

      <section className="on-dark bg-brand-band text-white">
        <div className="container-site pt-10 pb-36 lg:pt-14 lg:pb-44">
          <Breadcrumbs trail={trail} />
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-sun hover:underline hover:underline-offset-4">
            <ArrowLeft aria-hidden className="size-4" /> All articles
          </Link>
          <p className="mt-5">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.82rem] font-bold text-white">{post.category}</span>
          </p>
          <h1 className="mt-4 max-w-[26ch] text-[clamp(2.1rem,4.2vw,3.3rem)] text-white">{post.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-on-dark">
            <span>
              By <span className="font-semibold text-white">{site.name}</span>
            </span>
            <span aria-hidden>·</span>
            <span>
              Published <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            </span>
            {post.dateModified !== post.datePublished ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="size-4" /> {minutes} min read
            </span>
          </p>
        </div>
      </section>

      <div className="container-site -mt-28 lg:-mt-36">
        <div className="relative aspect-[16/9] overflow-hidden rounded-brand bg-cloud shadow-card lg:aspect-[21/8]">
          <Image {...photoProps(post.cover)} alt={post.cover.alt} fill priority sizes="(min-width: 1216px) 76rem, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-site grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16 lg:py-16">
        <article className="min-w-0">
          <section className="max-w-[70ch] rounded-brand border-l-4 border-ember bg-mist p-5 sm:p-6" aria-labelledby="in-short">
            <h2 id="in-short" className="font-sans text-[0.82rem] font-bold tracking-[0.14em] text-ember-text uppercase">
              In short
            </h2>
            <div className="mt-2 space-y-2.5 text-[1.04rem] text-ink">
              {post.summary.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </section>

          {toc.length > 2 ? (
            <nav aria-labelledby="toc-mobile" className="mt-8 rounded-brand border border-line p-5 lg:hidden">
              <h2 id="toc-mobile" className="font-sans text-[0.95rem] font-bold text-navy-900">
                In this article
              </h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.95rem] marker:text-ember-text">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-navy-800 hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="prose-sw prose-article mt-10">
            <Markdown source={post.body} />
          </div>

          <div className="mt-12 max-w-[70ch] rounded-brand bg-navy-900 p-6 text-white sm:p-8" data-area="article-cta">
            <h2 className="text-[1.6rem] text-white">{cta.title}</h2>
            <p className="mt-2 text-on-dark">{cta.body}</p>
            <Button asChild className="mt-5">
              <Link href={`/contact-us?service=${cta.query}`} data-cta={`article-${post.slug}`}>
                {cta.label} <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Article navigation and related services">
          {toc.length > 2 ? (
            <nav aria-labelledby="toc-desktop" className="hidden rounded-brand border border-line p-5 lg:block">
              <h2 id="toc-desktop" className="font-sans text-[0.95rem] font-bold text-navy-900">
                In this article
              </h2>
              <ol className="mt-3 space-y-2 text-[0.92rem]">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="block border-l-2 border-line pl-3 text-ink-soft transition-colors hover:border-ember hover:text-navy-900">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="rounded-brand border border-line bg-mist p-5">
            <h2 className="font-sans text-[0.95rem] font-bold text-navy-900">Related services</h2>
            <ul className="mt-3 space-y-3">
              {post.services.map((key) => (
                <li key={key}>
                  <Link href={services[key].path} className="group flex items-start justify-between gap-3 font-semibold text-navy-800">
                    <span className="group-hover:underline">{services[key].name}</span>
                    <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-ember-text" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/how-it-works" className="group flex items-start justify-between gap-3 font-semibold text-navy-800">
                  <span className="group-hover:underline">How It Works</span>
                  <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-ember-text" />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <section aria-labelledby="related-title" className="bg-mist py-14 lg:py-18">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="related-title" className="text-[clamp(1.7rem,2.8vw,2.2rem)]">
              Related articles
            </h2>
            <Link href="/blog" className="link-inline inline-flex items-center gap-1.5">
              Back to the blog <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <BlogCard post={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand location={`article-${post.slug}`} title="Tell us what your team needs." body="We’ll discuss the role, the skills required and how a dedicated Staffing Wise placement could fit into your operation." ctaLabel="Start a Conversation" />
    </>
  );
}
