import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { images, photoProps } from "@/lib/content/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { offices, site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/contact-us";
const title = "Contact Staffing Wise | Discuss Your Staffing Requirements";
const description =
  "Discuss dedicated customs, finance or administration staff with Staffing Wise. Call 01 912 0250, email info@staffingwise.ie or send an enquiry.";
const trail = [{ name: "Contact Us", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

const expect = [
  "We review your enquiry and get in touch to arrange a conversation.",
  "We discuss the role, workload, systems, working hours and the skills needed.",
  "We explain how a dedicated placement would work and the next steps.",
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "ContactPage"), breadcrumbSchema(trail)]} />

      <section className="on-dark bg-brand-band text-white">
        <div className="container-site pt-10 pb-28 lg:pt-14 lg:pb-36">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.25rem,4.6vw,3.6rem)] text-white">Let’s Discuss Your Staffing Requirements</h1>
          <p className="mt-5 max-w-[62ch] text-[1.08rem] text-on-dark">
            Tell us a little about your business and the support you need. We’ll use the information to understand the role, skills, working hours and systems
            involved, then discuss whether Staffing Wise is a good fit.
          </p>
        </div>
      </section>

      <section className="pb-18 lg:pb-24" aria-label="Enquiry form and contact details">
        <div className="container-site -mt-20 grid gap-8 lg:-mt-28 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          <div id="enquiry">
            <EnquiryForm />
          </div>

          <div className="space-y-6" data-area="contact-sidebar">
            <div className="overflow-hidden rounded-brand bg-white shadow-card">
              <div className="relative aspect-[16/9] bg-cloud">
                <Image {...photoProps(images.managerCall)} alt={images.managerCall.alt} fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-[1.5rem]">Prefer to talk?</h2>
                <ul className="mt-4 space-y-3.5">
                  <li>
                    <a href={site.phone.href} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-ember-text">
                      <Phone aria-hidden className="size-5 text-ember" /> {site.phone.display}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-ember-text">
                      <Mail aria-hidden className="size-5 text-ember" /> {site.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-navy-900 hover:text-ember-text">
                      <LinkedinIcon className="size-5 text-ember" /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                </ul>
                <p className="mt-4 text-[0.9rem] text-ink-soft">Calling from outside Ireland? Use {site.phone.international}.</p>
              </div>
            </div>

            <div className="rounded-brand border border-line bg-white p-6">
              <h2 className="flex items-center gap-2.5 text-[1.35rem]">
                <Clock aria-hidden className="size-5 text-ember" /> What happens next
              </h2>
              <ol className="mt-4 space-y-3">
                {expect.map((e, i) => (
                  <li key={e} className="flex gap-3 text-[0.97rem] text-ink-soft">
                    <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-navy-900 text-[0.8rem] font-bold text-sun">
                      {i + 1}
                    </span>
                    {e}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-brand border border-line bg-white p-6">
              <h2 className="flex items-center gap-2.5 text-[1.35rem]">
                <MapPin aria-hidden className="size-5 text-ember" /> Offices
              </h2>
              <ul className="mt-4 space-y-4">
                {offices.map((o) => (
                  <li key={o.label}>
                    <p className="font-semibold text-navy-900">{o.label}</p>
                    <address className="text-[0.95rem] text-ink-soft not-italic">
                      {o.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
