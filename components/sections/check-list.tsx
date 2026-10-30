import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CheckList({ items, className, columns }: { items: string[]; className?: string; columns?: 2 }) {
  return (
    <ul className={cn("grid gap-3.5", columns === 2 && "sm:grid-cols-2 sm:gap-x-8", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CircleCheck aria-hidden className="mt-0.5 size-5.5 shrink-0 text-ember" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
