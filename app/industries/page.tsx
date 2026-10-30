import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { images, type Photo, photoProps } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/industries";
const title = "Staffing for Freight Forwarders & Customs Agents | Staffing Wise";
const description =
  "Dedicated staff for freight forwarders, customs agents, hauliers and logistics companies in Ireland and the UK: customs, finance and back-office support.";
const trail = [{ name: "Industries We Support", path }];

export const metadata: Metadata = buildMetadata({ title, description, path, image: images.containersAerial });

type Sector = { id: string; name: string; image: Photo; intro: string; support: string[]; link: { label: string; href: string } };

const sectors: Sector[] = [
  {
    id: "freight-forwarders",
    name: "Freight forwarders",
    image: images.containersAerial,
    intro:
      "Forwarders managing regular import and export movements need dependable capacity for declarations, documentation and the administration that keeps shipments moving.",
    support: [
      "Import and export customs declaration processing, depending on the role and training.",
      "Supporting documentation and routine declaration checks.",
      "Order processing, document administration and customer updates.",
    ],
    link: { label: "Customs clearance staffing", href: "/customs-clearance-staffing" },
  },
  {
    id: "customs-agents",
    name: "Customs agents",
    image: images.clerkDocuments,
    intro:
      "Customs agents looking to increase declaration-processing capacity can add a dedicated staff member who learns their systems, procedures and quality standards.",
    support: [
      "Declaration processing on systems such as Thyme IT, CDS and AIS/AES, where relevant to the role.",
      "Food and regulatory clearance workflows, including CHEDs and IPAFFS, where applicable and after training.",
      "Communication and administration connected with day-to-day customs operations.",
    ],
    link: { label: "Customs clearance staffing", href: "/customs-clearance-staffing" },
  },
  {
    id: "hauliers",
    name: "Hauliers",
    image: images.lorry,
    intro:
      "Haulage businesses carry a steady load of paperwork alongside the work on the road. A dedicated team member can take on suitable, repeatable back-office tasks.",
    support: [
      "Customs administration connected with cross-border movements, where relevant.",
      "Data entry, record maintenance and document handling.",
      "Invoice processing and routine finance administration.",
    ],
    link: { label: "Administration & business support", href: "/administration-business-support" },
  },
  {
    id: "logistics-companies",
    name: "Logistics companies",
    image: images.warehouseTablet,
    intro:
      "Logistics businesses with recurring operational workloads can add capacity for customs administration, finance support and day-to-day operations.",
    support: [
      "Additional customs administration support.",
      "Order processing, customer-service and inbox support.",
      "Bookkeeping support, reconciliations and finance records.",
    ],
    link: { label: "Accounting & finance support", href: "/accounting-finance-support" },
  },
];

const problems = [
  "Difficulty recruiting suitable staff.",
  "High local employment costs.",
  "Increasing workloads or backlogs.",
  "Limited access to experienced customs personnel.",
  "The time involved in recruitment and day-to-day employment administration.",
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "CollectionPage"), breadcrumbSchema(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Industries we support"
        title="Dedicated Staff for Logistics and Customs Businesses"
        image={images.portAerial}
        intro={
          <p>
            Staffing Wise works with freight forwarders, customs agents, hauliers and logistics companies in Ireland and the UK. We focus on established businesses with
            recurring workloads, and the model is open to smaller firms where the requirements fit.
          </p>
        }
      >
        <Button asChild>
          <Link href="/contact-us" data-cta="industries-hero">
            Discuss Your Staffing Requirements <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <section className="py-18 lg:py-24" aria-labelledby="problems-title">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading
            id="problems-title"
            eyebrow="The challenges we hear"
            title="Common pressures across the sector"
            intro="Staffing Wise is designed to help business owners and directors add capacity and protect service levels without carrying the full burden of recruiting locally."
          />
          <CheckList className="self-center text-[1.04rem]" items={problems} />
        </div>
      </section>

      <div className="bg-mist py-6 lg:py-10">
        {sectors.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 py-10 lg:py-14">
            <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div data-reveal className={i % 2 ? "lg:order-2" : undefined}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-brand bg-cloud shadow-card">
                  <Image {...photoProps(s.image)} alt={s.image.alt} fill sizes="(min-width: 1024px) 38rem, 100vw" className="object-cover" />
                </div>
              </div>
              <div data-reveal>
                <h2 id={`${s.id}-title`} className="text-[clamp(1.8rem,3vw,2.4rem)]">
                  {s.name}
                </h2>
                <p className="mt-4 text-[1.04rem] text-ink-soft">{s.intro}</p>
                <h3 className="mt-6 font-sans text-[0.85rem] font-bold tracking-[0.12em] text-ember-text uppercase">Where a dedicated staff member can help</h3>
                <CheckList className="mt-3" items={s.support} />
                <Link href={s.link.href} className="link-inline mt-6 inline-flex items-center gap-1.5">
                  {s.link.label} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-16" aria-labelledby="other-title">
        <div className="container-site max-w-[52rem] text-center">
          <h2 id="other-title" className="text-[clamp(1.7rem,2.8vw,2.2rem)]">
            Not in logistics?
          </h2>
          <p className="mt-4 text-[1.04rem] text-ink-soft">
            Our finance and administration services can support other businesses with suitable, repeatable back-office work. If your requirement is not listed,{" "}
            <Link href="/contact-us?service=other" className="link-inline">
              tell us about it
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        location="industries"
        title="Tell us about your operation"
        body="Share the role, workload and systems involved, and we’ll discuss whether a dedicated Staffing Wise placement is the right fit."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
