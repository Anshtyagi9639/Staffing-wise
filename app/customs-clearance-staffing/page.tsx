import { ArrowRight, FileCheck, Network, Repeat, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ServiceView } from "@/components/analytics/service-view";
import { FromTheBlog } from "@/components/blog/from-the-blog";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SplitFeature } from "@/components/sections/split-feature";
import { Steps } from "@/components/sections/steps";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { customsFaqs } from "@/lib/content/faqs";
import { images } from "@/lib/content/images";
import { customsPlacementSteps } from "@/lib/content/process";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/lib/structured-data/schemas";

const service = services.customs;
const path = service.path;
const title = "Outsourced Customs Clearance Staff | Staffing Wise";
const description =
  "Dedicated, trained customs-clearance staff for freight forwarders and customs agents in Ireland and the UK. We manage recruitment, training and ongoing support.";
const trail = [{ name: service.name, path }];

export const metadata: Metadata = buildMetadata({ title, description, path, image: images.portTrucks });

const supportItems = [
  "Import and export customs declaration processing.",
  "Supporting documentation and routine declaration checks.",
  "Working with client-specific procedures, workflows and systems.",
  "Customs systems and processes such as Thyme IT, CDS and AIS/AES, where relevant to the role.",
  "Related food and regulatory clearance workflows, including CHEDs, IPAFFS and relevant HSE-related processes, where applicable and subject to training and client requirements.",
  "Communication and administration connected with day-to-day customs operations.",
];

const whoFor = [
  { title: "Customs agents", text: "Looking to increase declaration-processing capacity." },
  { title: "Freight forwarders", text: "Managing regular import and export movements." },
  { title: "Logistics businesses", text: "That need additional customs administration support." },
  { title: "Growing businesses", text: "Experiencing growth, seasonal peaks or difficulty recruiting locally." },
];

const atAGlance = [
  { icon: Repeat, label: "Dedicated", text: "One staff member works exclusively for your business." },
  { icon: FileCheck, label: "Declaration support", text: "Import and export declarations and related customs administration." },
  { icon: Network, label: "Your systems", text: "Trained on the systems and procedures you use." },
  { icon: ShieldCheck, label: "Managed for you", text: "Recruitment, employment, initial training and ongoing support." },
];

export default function CustomsClearanceStaffingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(path, title, description),
          breadcrumbSchema(trail),
          serviceSchema(service, description, ["Freight forwarders", "Customs agents", "Logistics companies", "Hauliers"]),
          faqSchema(customsFaqs, path),
        ]}
      />
      <ServiceView name={service.name} />

      <PageHero
        trail={trail}
        eyebrow="Customs Clearance Staffing"
        title="Dedicated Customs Clearance Staff for Your Business"
        image={images.portTrucks}
        intro={
          <>
            <p>
              For freight forwarders, customs agents and logistics companies, increase customs-processing capacity with dedicated personnel who work exclusively for
              your business.
            </p>
            <p className="mt-3">
              Staffing Wise recruits and prepares dedicated staff, then manages the employment and ongoing support around the placement.
            </p>
          </>
        }
      >
        <Button asChild>
          <Link href="/contact-us?service=customs" data-cta="customs-hero">
            Discuss Your Customs Staffing Requirements <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      {/* At a glance */}
      <section aria-label="At a glance" className="border-b border-line bg-white">
        <ul className="container-site grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {atAGlance.map(({ icon: Icon, label, text }) => (
            <li key={label} className="flex gap-3.5">
              <Icon aria-hidden className="mt-1 size-6 shrink-0 text-ember" />
              <div>
                <p className="font-display text-[1.2rem] text-navy-900">{label}</p>
                <p className="text-[0.95rem] text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-18 lg:py-24" aria-labelledby="support-title">
        <div className="container-site">
          <SplitFeature image={images.coordinatorPaperwork} tall>
            <SectionHeading id="support-title" eyebrow="Scope of work" title="What our customs staff can support" />
            <CheckList className="mt-6 text-[1.02rem]" items={supportItems} />
            <p className="mt-6 rounded-r-[6px] border-l-4 border-ember bg-mist px-4 py-3 text-[0.95rem] text-ink-soft">
              The precise duties depend on the individual’s experience, your procedures and the training required. Not every staff member will be ready to handle
              every type of declaration or regulatory clearance from day one, so responsibilities are agreed for each placement.
            </p>
          </SplitFeature>
        </div>
      </section>

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="model-title">
        <div className="container-site">
          <SplitFeature image={images.officeTeam} reverse>
            <SectionHeading id="model-title" eyebrow="The staffing model" title="A staffing model designed around customs operations" />
            <div className="mt-5 space-y-4 text-[1.04rem] text-ink-soft">
              <p>
                Customs operations often involve tight deadlines, changing volumes and established client-specific processes. A dedicated staff member can learn your
                systems and workflows over time, helping build continuity and capacity within your operation.
              </p>
              <p>
                Staffing Wise manages recruitment, employment, initial training and ongoing support. The staff member works exclusively for your business, with the
                working arrangement and responsibilities agreed during onboarding.
              </p>
            </div>
          </SplitFeature>
        </div>
      </section>

      <section className="py-18 lg:py-24" aria-labelledby="placement-title">
        <div className="container-site">
          <SectionHeading id="placement-title" eyebrow="Process" title="How a customs placement works" />
          <Steps className="mt-10" steps={customsPlacementSteps} />
          <p className="mt-8 text-ink-soft">
            Read more about{" "}
            <Link href="/how-it-works" className="link-inline">
              how the Staffing Wise model works
            </Link>
            , including what we manage and what we ask from you.
          </p>
        </div>
      </section>

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="who-title">
        <div className="container-site">
          <SectionHeading id="who-title" eyebrow="Who is this for?" title="Customs capacity for the businesses that need it" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whoFor.map((w) => (
              <li key={w.title} data-reveal className="rounded-brand border-t-4 border-ember bg-white p-6 shadow-card">
                <h3 className="text-[1.3rem]">{w.title}</h3>
                <p className="mt-2 text-ink-soft">{w.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink-soft">
            See how we support{" "}
            <Link href="/industries" className="link-inline">
              freight forwarders, customs agents, hauliers and logistics companies
            </Link>
            .
          </p>
        </div>
      </section>

      <FromTheBlog service="customs" title="Customs staffing guides" />

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="faq-title">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQs" title="Customs clearance staffing questions" />
            <p className="mt-4 text-ink-soft">
              General questions about employment, working hours and confidentiality are answered on our{" "}
              <Link href="/faqs" className="link-inline">
                FAQs page
              </Link>
              .
            </p>
          </div>
          <FaqList items={customsFaqs} location="customs" />
        </div>
      </section>

      <CtaBand
        location="customs"
        title="Need more customs-processing capacity?"
        body="Need more customs-processing capacity without managing another full local recruitment process? Tell us about your operation and we’ll discuss the skills and staffing arrangement you need."
        ctaLabel="Discuss Your Customs Staffing Requirements"
        href="/contact-us?service=customs"
      />
    </>
  );
}
