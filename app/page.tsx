import { ArrowRight, GraduationCap, Handshake, Target, Timer, TrendingUp, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { SectionHeading } from "@/components/sections/section-heading";
import { SplitFeature } from "@/components/sections/split-feature";
import { Steps } from "@/components/sections/steps";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { homeFaqs } from "@/lib/content/faqs";
import { images, type Photo, photoProps } from "@/lib/content/images";
import { howItWorksSummary } from "@/lib/content/process";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/site";
import { webPageSchema } from "@/lib/structured-data/schemas";

const title = "Dedicated Customs Clearance & Back-Office Staff | Staffing Wise";
const description =
  "Dedicated, trained overseas staff for freight forwarders, customs agents and logistics companies in Ireland and the UK. We manage recruitment and ongoing support.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/" });

const benefits = [
  { icon: Timer, text: "Reduce the time and administration involved in recruitment and onboarding." },
  { icon: UserCheck, text: "Build continuity with a dedicated person who learns your business." },
  { icon: GraduationCap, text: "Tailor initial training to your systems and procedures." },
  { icon: TrendingUp, text: "Scale support in line with changing workload and operational needs." },
  { icon: Handshake, text: "Have one partner managing employment arrangements and ongoing staff support." },
  { icon: Target, text: "Keep your internal team focused on higher-value work." },
];

const audiences: { name: string; href: string; image: Photo; text: string }[] = [
  { name: "Freight forwarders", href: "/industries#freight-forwarders", image: images.containersAerial, text: "Capacity for regular import and export movements." },
  { name: "Customs agents", href: "/industries#customs-agents", image: images.clerkDocuments, text: "More declaration-processing capacity." },
  { name: "Hauliers", href: "/industries#hauliers", image: images.lorry, text: "Back-office and customs administration support." },
  { name: "Logistics companies", href: "/industries#logistics-companies", image: images.warehouseTablet, text: "Dedicated support for recurring workloads." },
];

const customsSystems = ["Thyme IT", "CDS", "AIS/AES", "CHEDs", "IPAFFS"];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[webPageSchema("/", title, description)]} />

      {/* Hero */}
      <section aria-labelledby="home-title" className="on-dark bg-brand-band overflow-hidden text-white">
        <div className="container-site grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-20 lg:pb-24">
          <div>
            <p className="eyebrow">Dedicated staffing for logistics and customs</p>
            <h1 id="home-title" className="mt-4 max-w-[19ch] text-[clamp(2.6rem,5.2vw,4.2rem)] leading-[1.05] text-white">
              Build Your Team Without the Traditional Hiring Costs.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.1rem] text-on-dark">
              Give your operation the people and capacity it needs without carrying the full burden of local recruitment and employment administration.
              Staffing Wise provides dedicated, trained overseas professionals who work exclusively for your business, supported by our team from
              recruitment and onboarding through to ongoing development.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact-us" data-cta="home-hero">
                  Discuss Your Staffing Requirements <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#services" data-cta="home-hero-secondary">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -top-4 -right-4 hidden h-1/2 w-1/2 rounded-brand border-2 border-ember/70 sm:block" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-brand shadow-card">
              <Image {...photoProps(images.teamMeeting)} alt={images.teamMeeting.alt} fill priority sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
            </div>
            <Link
              href={services.customs.path}
              data-cta="home-hero-card"
              className="group relative -mt-12 ml-4 block max-w-[21rem] rounded-brand border-l-4 border-ember bg-white p-4.5 text-ink shadow-card transition-transform hover:-translate-y-0.5 sm:-mt-16 sm:ml-[-1.5rem]"
            >
              <span className="block text-[0.78rem] font-bold tracking-[0.12em] text-ember-text uppercase">Our specialist service</span>
              <span className="mt-1 flex items-center justify-between gap-3 font-display text-[1.35rem] text-navy-900">
                Customs Clearance Staffing
                <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 bg-navy-950/40">
          <p className="container-site py-4 text-center text-[0.95rem] text-on-dark">
            For <strong className="font-semibold text-white">freight forwarders</strong>, <strong className="font-semibold text-white">customs agents</strong>,{" "}
            <strong className="font-semibold text-white">hauliers</strong> and <strong className="font-semibold text-white">logistics companies</strong> in Ireland and
            the UK.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-18 lg:py-24" aria-labelledby="intro-title">
        <div className="container-site">
          <SplitFeature image={images.teamDocuments}>
            <SectionHeading id="intro-title" eyebrow="Our approach" title="A dedicated team, built around your business" />
            <div className="mt-5 space-y-4 text-[1.04rem] text-ink-soft">
              <p>
                Every business has different systems, processes and pressures. Our approach starts by understanding how your operation works and the support you
                need. We recruit for the role, provide initial training and help integrate your dedicated staff member into your existing team.
              </p>
              <p>Staffing Wise remains involved to provide ongoing support and manage the employment side.</p>
            </div>
            <CheckList
              className="mt-6"
              items={[
                "Dedicated people, not a shared pool of outsourced resources.",
                "Staff work exclusively for you and get to know your systems, procedures and expectations.",
                "Flexible capacity that can grow with your workload.",
              ]}
            />
          </SplitFeature>
        </div>
      </section>

      {/* Featured service: Customs */}
      <section id="services" className="bg-mist py-18 lg:py-24" aria-labelledby="customs-title">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-brand bg-white shadow-card lg:grid-cols-2">
            <div className="relative min-h-72 lg:min-h-full">
              <Image {...photoProps(images.portAerial)} alt={images.portAerial.alt} fill sizes="(min-width: 1024px) 38rem, 100vw" className="object-cover" />
              <span className="absolute top-4 left-4 rounded-full bg-sun px-3.5 py-1.5 text-[0.8rem] font-bold tracking-wide text-navy-950 uppercase">Featured service</span>
            </div>
            <div className="p-7 sm:p-10 lg:p-12" data-reveal>
              <p className="eyebrow">Customs Clearance Staffing</p>
              <h2 id="customs-title" className="mt-3 text-[clamp(1.85rem,3.2vw,2.5rem)]">
                Specialist staffing support for customs agents, freight forwarders and logistics businesses
              </h2>
              <p className="mt-4 text-[1.04rem] text-ink-soft">
                Increase declaration-processing capacity with dedicated personnel trained for customs-clearance work and your operating procedures. Depending on the
                role and your requirements, staff may support import and export declarations and related processes using systems such as Thyme IT, CDS, AIS/AES,
                CHEDs, IPAFFS and relevant HSE-related clearance processes.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Systems and processes staff may support, depending on the role">
                {customsSystems.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-mist px-3 py-1 text-[0.85rem] font-semibold text-navy-800">
                    {s}
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary" className="mt-7">
                <Link href={services.customs.path} data-cta="home-customs">
                  Explore Customs Clearance Staffing <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          {/* Other services */}
          <div className="mt-16">
            <SectionHeading eyebrow="Other staffing services" title="The same dedicated model for finance and administration" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard image={images.financeCalculator} title={services.finance.name} href={services.finance.path} text={services.finance.summary} />
              <ServiceCard image={images.supportHeadset} title={services.admin.name} href={services.admin.path} text={services.admin.summary} />
              <div data-reveal className="flex flex-col justify-between rounded-brand border-2 border-dashed border-line bg-white p-7 md:col-span-2 lg:col-span-1">
                <div>
                  <h3 className="text-[1.45rem]">Need a different role?</h3>
                  <p className="mt-3 text-ink-soft">
                    If the support you need is not listed, tell us about it. We will review the tasks, skills and working arrangement required before confirming whether
                    we can support the position.
                  </p>
                </div>
                <Link href="/contact-us" data-cta="home-other-role" className="link-inline mt-6 inline-flex items-center gap-1.5">
                  Tell us what you need <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Staffing Wise */}
      <section className="py-18 lg:py-24" aria-labelledby="why-title">
        <div className="container-site">
          <SectionHeading
            id="why-title"
            eyebrow="Why Staffing Wise?"
            title="More capacity, less management burden"
            intro="The value is the overall service, consistency and reduced management burden, not simply a lower hourly cost."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} data-reveal className="flex gap-4 rounded-brand border border-line p-5.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 text-sun">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="text-[1.01rem] text-ink">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 overflow-hidden rounded-brand border border-line" data-reveal>
            <h3 className="bg-navy-900 px-6 py-4 font-sans text-[1.02rem] font-bold text-white">How the dedicated model compares</h3>
            <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
              <Compare
                title="Traditional recruitment"
                text="A candidate is introduced, then you take on employment, onboarding and day-to-day management yourself."
              />
              <Compare title="Shared outsourced service" text="Tasks are handled by a pool of people who may also work for other clients." />
              <Compare
                highlight
                title="Staffing Wise dedicated model"
                text="A dedicated person works exclusively for your business, while we manage recruitment, employment, initial training and ongoing support."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-mist py-18 lg:py-24" aria-labelledby="how-title">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="how-title" eyebrow="How it works" title="Four steps to a dedicated team member" />
            <Link href="/how-it-works" className="link-inline inline-flex shrink-0 items-center gap-1.5">
              How the model works in detail <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <Steps className="mt-10" steps={howItWorksSummary} />
        </div>
      </section>

      {/* Audiences */}
      <section className="py-18 lg:py-24" aria-labelledby="who-title">
        <div className="container-site">
          <SectionHeading
            id="who-title"
            eyebrow="Who we work with"
            title="Built for businesses with recurring operational workloads"
            intro="We work with established businesses that need dependable additional capacity, and with smaller firms where the requirements fit."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <li key={a.name} data-reveal>
                <Link href={a.href} className="group block h-full overflow-hidden rounded-brand border border-line bg-white transition-shadow hover:shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-cloud">
                    <Image {...photoProps(a.image)} alt="" fill sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <h3 className="flex items-center justify-between gap-2 text-[1.3rem]">
                      {a.name}
                      <ArrowRight aria-hidden className="size-4.5 text-ember-text transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] text-ink-soft">{a.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-mist py-18 lg:py-24" aria-labelledby="faq-title">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQs" title="Common questions about dedicated staffing" />
            <p className="mt-4 text-ink-soft">
              More answers about the model, employment, working hours and customs placements are on our{" "}
              <Link href="/faqs" className="link-inline">
                FAQs page
              </Link>
              .
            </p>
          </div>
          <FaqList items={homeFaqs} location="home" />
        </div>
      </section>

      <CtaBand
        location="home"
        title="Tell us what your team needs."
        body="We’ll discuss the role, the skills required and how a dedicated Staffing Wise placement could fit into your operation."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}

function ServiceCard({ image, title, href, text }: { image: Photo; title: string; href: string; text: string }) {
  return (
    <article data-reveal className="group relative flex flex-col overflow-hidden rounded-brand border border-line bg-white transition-shadow hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <Image {...photoProps(image)} alt={image.alt} fill sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.45rem]">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-ink-soft">{text}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-800">
          Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

function Compare({ title, text, highlight }: { title: string; text: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "bg-sun/25 p-6" : "bg-white p-6"}>
      <h4 className={highlight ? "font-display text-[1.25rem] text-navy-900" : "font-display text-[1.25rem] text-slate"}>{title}</h4>
      <p className="mt-2 text-[0.97rem] text-ink-soft">{text}</p>
    </div>
  );
}
