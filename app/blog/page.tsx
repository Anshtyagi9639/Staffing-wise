import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { blogCategories, featuredPost, posts, toCard } from "@/lib/blog";
import { images, photoProps } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, services } from "@/lib/site";
import { blogSchema, breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/blog";
const title = "Customs Staffing & Outsourcing Blog | Staffing Wise";
const description =
  "Practical guides on customs clearance outsourcing, dedicated customs staff, declaration volumes and outsourced finance and admin support in the UK and Ireland.";
const trail = [{ name: "Blog", path }];

export const metadata: Metadata = buildMetadata({ title, description, path, image: images.portCranes });

export default function BlogPage() {
  const featured = toCard(featuredPost());
  const cards = posts.map(toCard);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(path, title, description, "CollectionPage"),
          breadcrumbSchema(trail),
          blogSchema(
            path,
            posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), headline: p.title, datePublished: p.datePublished })),
          ),
        ]}
      />

      <section className="on-dark bg-brand-band text-white">
        <div className="container-site pt-10 pb-14 lg:pt-14 lg:pb-16">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">Staffing Wise blog</p>
          <h1 className="mt-3 max-w-[22ch] text-[clamp(2.25rem,4.6vw,3.5rem)] text-white">Insights on Customs Staffing and Outsourcing</h1>
          <p className="mt-5 max-w-[64ch] text-[1.08rem] text-on-dark">
            Practical guides for freight forwarders, customs agents, hauliers and logistics businesses in Ireland and the UK: customs clearance outsourcing,
            dedicated staff, declaration volumes, and finance and administration support.
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section aria-labelledby="featured-title" className="py-14 lg:py-18">
        <div className="container-site">
          <p className="eyebrow">Featured article</p>
          <article className="group relative mt-4 grid overflow-hidden rounded-brand border border-line bg-white shadow-card lg:grid-cols-[1.15fr_1fr]">
            <div className="relative aspect-[16/10] bg-cloud lg:aspect-auto lg:min-h-[24rem]">
              <Image {...photoProps(featured.cover)} alt={featured.cover.alt} fill priority sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem] text-ink-soft">
                <span className="rounded-full bg-mist px-3 py-1 font-bold text-navy-900">{featured.category}</span>
                <time dateTime={featured.datePublished}>{featured.dateLabel}</time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden className="size-3.5" /> {featured.minutes} min read
                </span>
              </p>
              <h2 id="featured-title" className="mt-4 text-[clamp(1.7rem,2.8vw,2.3rem)]">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 text-[1.03rem] text-ink-soft">{featured.excerpt}</p>
              <span aria-hidden className="mt-6 inline-flex items-center gap-1.5 font-semibold text-navy-800">
                Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="all-title" className="bg-mist py-14 lg:py-18">
        <div className="container-site">
          <h2 id="all-title" className="text-[clamp(1.7rem,2.8vw,2.2rem)]">
            All articles
          </h2>
          <div className="mt-6">
            <BlogExplorer posts={cards} categories={blogCategories} featuredSlug={featured.slug} />
          </div>
        </div>
      </section>

      <section aria-labelledby="services-title" className="py-14 lg:py-16">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 id="services-title" className="text-[clamp(1.6rem,2.6vw,2.1rem)]">
              Looking for dedicated staff rather than reading about it?
            </h2>
            <p className="mt-3 max-w-[60ch] text-ink-soft">
              Staffing Wise provides dedicated, trained staff for{" "}
              <Link href={services.customs.path} className="link-inline">
                customs clearance
              </Link>
              ,{" "}
              <Link href={services.finance.path} className="link-inline">
                accounting and finance
              </Link>{" "}
              and{" "}
              <Link href={services.admin.path} className="link-inline">
                administration
              </Link>
              .
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/how-it-works" data-cta="blog-how-it-works">
              How the model works <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand
        location="blog"
        title="Have a question about your own operation?"
        body="Tell us about the role, workload and systems involved, and we’ll discuss how a dedicated Staffing Wise placement could help."
        ctaLabel="Discuss Your Staffing Requirements"
      />
    </>
  );
}
