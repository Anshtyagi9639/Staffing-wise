import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { customsFaqs, generalFaqs } from "@/lib/content/faqs";
import { images } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/faqs";
const title = "Outsourced Staffing & Customs Staffing FAQs | Staffing Wise";
const description =
  "Answers about the Staffing Wise dedicated staffing model: employment, working hours, training, confidentiality and customs-clearance placements.";
const trail = [{ name: "FAQs", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail), faqSchema([...generalFaqs, ...customsFaqs], path)]} />

      <PageHero
        trail={trail}
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        image={images.planning}
        intro={
          <p>
            Straight answers about how dedicated staffing works, who employs the staff and what customs-clearance placements involve. Can’t find your question?{" "}
            <Link href="/contact-us" className="font-semibold text-white underline decoration-ember decoration-2 underline-offset-4 hover:text-sun">
              Ask us directly
            </Link>
            .
          </p>
        }
      />

      <div className="py-18 lg:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              <li>
                <a href="#general" className="inline-block rounded-full border border-line px-4 py-2 font-semibold text-navy-900 hover:border-navy-900 lg:block lg:rounded-brand">
                  General staffing
                </a>
              </li>
              <li>
                <a href="#customs" className="inline-block rounded-full border border-line px-4 py-2 font-semibold text-navy-900 hover:border-navy-900 lg:block lg:rounded-brand">
                  Customs clearance staffing
                </a>
              </li>
            </ul>
          </nav>
          <div className="space-y-16">
            <section id="general" aria-labelledby="general-title" className="scroll-mt-28">
              <h2 id="general-title" className="text-[clamp(1.7rem,2.8vw,2.2rem)]">
                General staffing questions
              </h2>
              <div className="mt-6">
                <FaqList items={generalFaqs} location="faqs-general" />
              </div>
            </section>
            <section id="customs" aria-labelledby="customs-title" className="scroll-mt-28">
              <h2 id="customs-title" className="text-[clamp(1.7rem,2.8vw,2.2rem)]">
                Customs clearance staffing questions
              </h2>
              <p className="mt-3 text-ink-soft">
                For a full overview, see{" "}
                <Link href="/customs-clearance-staffing" className="link-inline">
                  Customs Clearance Staffing
                </Link>
                .
              </p>
              <div className="mt-6">
                <FaqList items={customsFaqs} location="faqs-customs" />
              </div>
            </section>
          </div>
        </div>
      </div>

      <CtaBand
        location="faqs"
        title="Still have a question?"
        body="Tell us what you need and we’ll answer it directly, including how the model would work for your role, systems and hours."
        ctaLabel="Contact Us"
      />
    </>
  );
}
