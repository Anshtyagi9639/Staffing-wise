import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

type CtaBandProps = { title: string; body: string; ctaLabel: string; href?: string; location: string };

/** Closing call to action, used at the end of every page. */
export function CtaBand({ title, body, ctaLabel, href = "/contact-us", location }: CtaBandProps) {
  return (
    <section className="on-dark bg-brand-band text-white" aria-labelledby={`cta-${location}`}>
      <div className="container-site grid items-center gap-8 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 id={`cta-${location}`} className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-[1.06rem] text-on-dark">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-start">
          <Button asChild>
            <Link href={href} data-cta={`cta-band-${location}`}>
              {ctaLabel} <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="whitespace-nowrap">
            <a href={site.phone.href} data-area={`cta-band-${location}`}>
              <Phone aria-hidden /> {site.phone.display}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
