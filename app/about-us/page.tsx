import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SplitFeature } from "@/components/sections/split-feature";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { offices, site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/about-us";
const title = "About Staffing Wise | Dedicated Teams for Logistics Businesses";
const description =
  "Staffing Wise helps freight forwarders, customs agents, hauliers and logistics firms build dedicated overseas teams, with recruitment, training and support.";
const trail = [{ name: "About Us", path }];

export const metadata: Metadata = buildMetadata({ title, description, path, image: images.workshop });

/*
 * The client document asks for verified company background, management biographies, approved client examples and a
 * confidentiality / information-security summary. None has been supplied yet, so nothing is invented here.
 * See docs/client-questions.md, "About page".
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "AboutPage"), breadcrumbSchema(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="About Staffing Wise"
        title="A Practical Partner for Building Your Team"
        image={images.workshop}
        intro={
          <p>
            Staffing Wise helps freight forwarders, customs agents, hauliers and logistics companies build dedicated overseas teams without having to manage every part
            of recruitment and employment themselves.
          </p>
        }
      >
        <Button asChild>
          <Link href="/contact-us" data-cta="about-hero">
            Start a Conversation <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <section className="py-18 lg:py-24" aria-labelledby="approach-title">
        <div className="container-site">
          <SplitFeature image={images.handshake}>
            <SectionHeading id="approach-title" eyebrow="Our approach" title="Built around understanding your operation" />
            <div className="mt-5 space-y-4 text-[1.04rem] text-ink-soft">
              <p>
                We combine recruitment, role-relevant training, employment arrangements and ongoing support to help clients add capacity in a structured way.
              </p>
              <p>
                Our approach is built around understanding each client’s operation and matching the role to the work that needs to be done. We aim to create long-term
                working relationships where dedicated staff become familiar with the client’s processes and contribute as an extension of the existing team.
              </p>
            </div>
          </SplitFeature>
        </div>
      </section>

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="believe-title">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="believe-title"
            eyebrow="What we stand for"
            title="Dedicated people, consistent support"
            intro="Customs-clearance staffing is our specialist focus, and the same model supports finance, administration and other suitable back-office roles."
          />
          <CheckList
            className="self-center text-[1.04rem]"
            items={[
              "Dedicated people, not a shared pool of outsourced resources.",
              "Staff who work exclusively for the client and learn its systems, procedures and expectations.",
              "Training tailored to the client’s processes and the role required.",
              "Flexible capacity that can grow with workload and business needs.",
              "Long-term working relationships, with Staffing Wise managing the employment side.",
            ]}
          />
        </div>
      </section>

      <section className="py-18 lg:py-24" aria-labelledby="where-title">
        <div className="container-site">
          <SectionHeading
            id="where-title"
            eyebrow="Where we work"
            title="Serving businesses in Ireland and the UK"
            intro="Our initial focus is clients in Ireland and the UK. We are open to discussing suitable opportunities with businesses elsewhere."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {offices.map((o) => (
              <li key={o.label} className="rounded-brand border border-line p-6">
                <h3 className="text-[1.35rem]">{o.label} office</h3>
                <address className="mt-2 text-ink-soft not-italic">{o.lines.join(", ")}</address>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            Contact the team on{" "}
            <a href={site.phone.href} className="link-inline">
              {site.phone.display}
            </a>{" "}
            or{" "}
            <a href={`mailto:${site.email}`} className="link-inline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand
        location="about"
        title="Let’s talk about your team"
        body="Tell us about your business and the support you need. We’ll discuss the role, skills, working hours and systems involved."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
