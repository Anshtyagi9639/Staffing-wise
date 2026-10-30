import Image from "next/image";
import type { ReactNode } from "react";
import { photoProps, type Photo } from "@/lib/content/images";
import { cn } from "@/lib/utils/cn";

type SplitFeatureProps = { image: Photo; children: ReactNode; reverse?: boolean; className?: string; tall?: boolean };

/** Text beside a photo. The photo sits first on mobile only when the layout is not reversed. */
export function SplitFeature({ image, children, reverse, className, tall }: SplitFeatureProps) {
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div data-reveal className={cn("relative", reverse && "lg:order-2")}>
        <div className={cn("relative overflow-hidden rounded-brand bg-cloud shadow-card", tall ? "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]")}>
          <Image {...photoProps(image)} alt={image.alt} fill sizes="(min-width: 1024px) 38rem, 100vw" className="object-cover" />
        </div>
        <div aria-hidden className={cn("absolute -bottom-3 h-1.5 w-28 rounded-full bg-ember", reverse ? "right-6" : "left-6")} />
      </div>
      <div data-reveal>{children}</div>
    </div>
  );
}
