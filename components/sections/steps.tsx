import { cn } from "@/lib/utils/cn";

export type Step = { title: string; body: string };

/** Numbered process steps. Rendered as an ordered list so the sequence is announced. */
export function Steps({ steps, className, headingLevel = "h3" }: { steps: Step[]; className?: string; headingLevel?: "h3" | "h2" }) {
  const Heading = headingLevel;
  return (
    <ol className={cn("grid gap-5 sm:grid-cols-2", steps.length === 4 && "lg:grid-cols-4", steps.length === 5 && "lg:grid-cols-5", className)}>
      {steps.map((s, i) => (
        <li key={s.title} data-reveal className="relative rounded-brand border border-line bg-white p-6 shadow-card">
          <span aria-hidden className="font-display text-[2.6rem] leading-none text-ember-text">
            {String(i + 1).padStart(2, "0")}
          </span>
          <Heading className="mt-3 text-[1.3rem]">
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </Heading>
          <p className="mt-2 text-[0.97rem] text-ink-soft">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
