import { ArrowRight, Building2, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FromTheBlog } from "@/components/blog/from-the-blog";
import { CheckList } from "@/components/sections/check-list";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SplitFeature } from "@/components/sections/split-feature";
import { Steps } from "@/components/sections/steps";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/content/images";
import { clientContributes, howItWorksDetail, staffingWiseManages } from "@/lib/content/process";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, howToSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/how-it-works";
const title = "How Dedicated Outsourced Staffing Works | Staffing Wise";
const description =
  "How the Staffing Wise model works: we understand your needs, recruit and train, onboard your dedicated staff member and provide ongoing support.";
const trail = [{ name: "How It Works", path }];

export const metadata: Metadata = buildMetadata({ title, description, path, image: images.videoCall });

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail), howToSchema(path, "How a Staffing Wise placement works", howItWorksDetail)]} />

      <PageHero
        trail={trail}
        eyebrow="How it works"
        title="How the Staffing Wise Model Works"
        image={images.smallTeam}
        intro={
          <p>
            A dedicated staff member who works exclusively for your business, with Staffing Wise managing recruitment, employment, initial training and ongoing
            support. Here is what happens at each stage, and how responsibilities are shared.
          </p>
        }
      >
        <Button asChild>
          <Link href="/contact-us" data-cta="how-hero">
            Discuss Your Staffing Requirements <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <section className="py-18 lg:py-24" aria-labelledby="steps-title">
        <div className="container-site">
          <SectionHeading id="steps-title" eyebrow="Four stages" title="From first conversation to ongoing support" />
          <Steps className="mt-10" steps={howItWorksDetail} />
        </div>
      </section>

      <section className="bg-mist py-18 lg:py-24" aria-labelledby="split-title">
        <div className="container-site">
          <SectionHeading
            id="split-title"
            eyebrow="Shared responsibilities"
            title="Who does what"
            intro="A placement works best when both sides know their part. The exact division of responsibilities is set out in your agreement."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div data-reveal className="rounded-brand bg-navy-900 p-7 text-white sm:p-9">
              <Users aria-hidden className="size-8 text-sun" />
              <h3 className="mt-4 text-[1.6rem] text-white">What Staffing Wise manages</h3>
              <CheckList className="mt-5 text-on-dark" items={staffingWiseManages} />
            </div>
            <div data-reveal className="rounded-brand border border-line bg-white p-7 sm:p-9">
              <Building2 aria-hidden className="size-8 text-ember" />
              <h3 className="mt-4 text-[1.6rem]">What the client contributes</h3>
              <CheckList className="mt-5 text-ink" items={clientContributes} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 lg:py-24" aria-labelledby="remote-title">
        <div className="container-site">
          <SplitFeature image={images.videoCall}>
            <SectionHeading id="remote-title" eyebrow="Working together" title="An extension of your existing team" />
            <div className="mt-5 space-y-4 text-[1.04rem] text-ink-soft">
              <p>
                Your dedicated staff member is introduced into your operation and becomes familiar with your team, systems, workflows and expectations. Because they
                work only for you, they build knowledge of your business over time.
              </p>
              <p>
                Staffing Wise stays involved after onboarding as a point of contact for communication, support and development, so you are not managing the employment
                side alone.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/customs-clearance-staffing" className="link-inline">
                Customs clearance staffing
              </Link>
              <Link href="/faqs" className="link-inline">
                Read the FAQs
              </Link>
            </div>
          </SplitFeature>
        </div>
      </section>

      <FromTheBlog service="customs" title="Further reading" className="bg-mist" />

      <CtaBand
        location="how-it-works"
        title="Ready to talk about a placement?"
        body="Tell us about the role, the work involved, your systems and the hours you need. We’ll explain how the model would work for your business."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
