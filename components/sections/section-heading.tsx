import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, id, align = "left", as: Tag = "h2", dark, className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-[46rem]", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag id={id} className={cn("mt-3 text-[clamp(1.85rem,3.2vw,2.6rem)]", dark && "text-white")}>
        {title}
      </Tag>
      {intro ? <div className={cn("mt-4 text-[1.06rem]", dark ? "text-on-dark" : "text-ink-soft")}>{intro}</div> : null}
    </div>
  );
}
