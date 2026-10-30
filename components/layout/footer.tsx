import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { Logo } from "@/components/ui/logo";
import { footerNav, offices, site } from "@/lib/site";
import { hasAnalyticsTools, hasMarketingTools } from "@/lib/tracking-config";

export function Footer() {
  return (
    <footer data-area="footer" className="on-dark bg-navy-950 text-on-dark">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr] lg:gap-12">
        <div>
          <Logo className="w-[140px]" />
          <p className="mt-5 max-w-[34ch] text-[0.95rem]">
            Dedicated, trained overseas staff for freight forwarders, customs agents, hauliers and logistics companies in Ireland and the UK.
          </p>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-white transition-colors hover:text-sun"
          >
            <LinkedinIcon className="size-5" /> Staffing Wise on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <FooterList title="Services" links={footerNav.services} />
        <FooterList title="Company" links={footerNav.company} />

        <div>
          <h2 className="font-sans text-[0.8rem] font-bold tracking-[0.14em] text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-2.5 transition-colors hover:text-sun">
                <Phone aria-hidden className="size-4 text-ember" /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-sun">
                <Mail aria-hidden className="size-4 text-ember" /> {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-ember" />
              <address className="not-italic">{offices[0].lines.slice(0, 3).join(", ")}</address>
            </li>
          </ul>
          <Link
            href="/contact-us"
            data-cta="footer"
            className="mt-5 inline-flex min-h-11 items-center rounded-brand bg-sun px-4 font-bold text-navy-950 transition-colors hover:bg-sun-deep"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Staffing Wise. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ))}
            {hasAnalyticsTools || hasMarketingTools ? (
              <li>
                <CookieSettingsButton className="transition-colors hover:text-sun" />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans text-[0.8rem] font-bold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-sun">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
