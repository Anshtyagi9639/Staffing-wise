import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ServiceView } from "@/components/analytics/service-view";
import { FromTheBlog } from "@/components/blog/from-the-blog";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SplitFeature } from "@/components/sections/split-feature";
import { Steps } from "@/components/sections/steps";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import type { Photo } from "@/lib/content/images";
import { howItWorksSummary } from "@/lib/content/process";
import { services, type Service } from "@/lib/site";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/structured-data/schemas";

type SupportServicePageProps = {
  service: Service;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string;
  heroImage: Photo;
  tasksImage: Photo;
  tasksTitle: string;
  tasksLead: string;
  tasks: string[];
  note: ReactNode;
  ctaLabel: string;
  ctaQuery: string;
  audience: string[];
};

/** Template for the Accounting & Finance and Administration service pages. */
export function SupportServicePage(p: SupportServicePageProps) {
  const trail = [{ name: p.service.name, path: p.service.path }];
  const contactHref = `/contact-us?service=${p.ctaQuery}`;
  const others = Object.values(services).filter((s) => s.key !== p.service.key);

  return (
    <>
      <JsonLd data={[webPageSchema(p.service.path, p.seoTitle, p.seoDescription), breadcrumbSchema(trail), serviceSchema(p.service, p.seoDescription, p.audience)]} />
      <ServiceView name={p.service.name} />

      <PageHero trail={trail} eyebrow={p.service.name} title={p.heading} image={p.heroImage} intro={<p>{p.intro}</p>}>
        <Button asChild>
          <Link href={contactHref} data-cta={`${p.service.key}-hero`}>
            {p.ctaLabel} <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <section className="py-18 lg:py-24" aria-labelledby="tasks-title">
        <div className="container-site">
          <SplitFeature image={p.tasksImage} tall>
            <SectionHeading id="tasks-title" eyebrow="Typical tasks" title={p.tasksTitle} />
            <p className="mt-4 text-[1.04rem] text-ink-soft">{p.tasksLead}</p>
            <CheckList className="mt-6 text-[1.02rem]" items={p.tasks} />
            <div className="mt-6 rounded-r-[6px] border-l-4 border-ember bg-mist px-4 py-3 text-[0.95rem] text-ink-soft">{p.note}</div>
          </SplitFeature>
        </div>
      </section>

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="how-title">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="how-title"
              eyebrow="How it works"
              title="The same dedicated model, applied to your team"
              intro="Your staff member works exclusively for your business. Staffing Wise manages recruitment, employment, onboarding and ongoing support."
            />
            <Link href="/how-it-works" className="link-inline inline-flex shrink-0 items-center gap-1.5">
              How the model works <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Steps className="mt-10" steps={howItWorksSummary} />
        </div>
      </section>

      <FromTheBlog service={p.service.key} />

      <section className="border-t border-line py-16" aria-labelledby="related-title">
        <div className="container-site">
          <h2 id="related-title" className="text-[1.7rem]">
            Other staffing services
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((s) => (
              <li key={s.key}>
                <Link href={s.path} className="group flex h-full items-start justify-between gap-4 rounded-brand border border-line p-5 transition-shadow hover:shadow-card">
                  <span>
                    <span className="block font-display text-[1.3rem] text-navy-900">{s.name}</span>
                    <span className="mt-1 block text-[0.95rem] text-ink-soft">{s.summary}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1.5 size-5 shrink-0 text-ember-text transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        location={p.service.key}
        title="Tell us what support you need"
        body="We’ll discuss the tasks, systems and experience required, then talk through how a dedicated Staffing Wise placement could support your existing processes."
        ctaLabel={p.ctaLabel}
        href={contactHref}
      />
    </>
  );
}
