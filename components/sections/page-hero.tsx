import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { photoProps, type Photo } from "@/lib/content/images";

type PageHeroProps = { eyebrow?: string; title: string; intro: ReactNode; trail: Crumb[]; image: Photo; children?: ReactNode };

/** Inner-page header: navy band, text on the left and a framed photo on the right. */
export function PageHero({ eyebrow, title, intro, trail, image, children }: PageHeroProps) {
  return (
    <section className="on-dark bg-brand-band overflow-hidden text-white">
      <div className="container-site grid items-center gap-10 pt-10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-14 lg:pb-20">
        <div>
          <Breadcrumbs trail={trail} />
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.25rem,4.6vw,3.6rem)] text-white">{title}</h1>
          <div className="mt-5 max-w-[60ch] text-[1.08rem] text-on-dark">{intro}</div>
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -right-3 -bottom-3 hidden h-2/3 w-2/3 rounded-brand border-2 border-ember/70 sm:block" />
          <div className="relative aspect-[16/11] overflow-hidden rounded-brand bg-navy-800 shadow-card">
            <Image {...photoProps(image)} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
