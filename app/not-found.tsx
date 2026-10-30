import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="on-dark bg-brand-band text-white">
      <div className="container-site py-20 lg:py-28">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 max-w-[20ch] text-[clamp(2.3rem,4.6vw,3.6rem)] text-white">We couldn’t find that page</h1>
        <p className="mt-5 max-w-[56ch] text-[1.08rem] text-on-dark">
          The page may have moved when we updated the website. These links should help you find what you need.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Go to the homepage</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/contact-us">Contact us</Link>
          </Button>
        </div>
        <ul className="mt-10 grid gap-2 text-on-dark sm:grid-cols-2 lg:grid-cols-3">
          {[...Object.values(services).map((s) => ({ label: s.name, href: s.path })), { label: "How It Works", href: "/how-it-works" }, { label: "FAQs", href: "/faqs" }].map(
            (l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline decoration-ember decoration-2 underline-offset-4 hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
