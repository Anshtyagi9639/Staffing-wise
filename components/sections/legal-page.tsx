import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

type LegalPageProps = { path: string; title: string; seoTitle: string; description: string; updated: string; children: ReactNode };

export function LegalPage({ path, title, seoTitle, description, updated, children }: LegalPageProps) {
  const trail = [{ name: title, path }];
  return (
    <>
      <JsonLd data={[webPageSchema(path, seoTitle, description), breadcrumbSchema(trail)]} />
      <section className="on-dark bg-brand-band text-white">
        <div className="container-site pt-10 pb-14 lg:pt-14">
          <Breadcrumbs trail={trail} />
          <h1 className="text-[clamp(2.2rem,4.4vw,3.3rem)] text-white">{title}</h1>
          <p className="mt-3 text-on-dark">Last updated: {updated}</p>
        </div>
      </section>
      <div className="container-site py-14 lg:py-18">
        <div className="mb-10 max-w-[70ch] rounded-r-[6px] border-l-4 border-ember bg-mist px-5 py-4 text-[0.95rem] text-ink-soft">
          <strong className="text-ink">Draft for review.</strong> This notice is a working draft based on how the website currently operates. It must be reviewed and
          approved by Staffing Wise and its legal adviser, and completed with the confirmed company details, before the website launches.
        </div>
        <div className="prose-sw">{children}</div>
      </div>
    </>
  );
}
