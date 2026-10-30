"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Faq } from "@/lib/content/faqs";

/**
 * FAQ accordion. Answers stay in the server-rendered HTML (Radix keeps closed content mounted via forceMount),
 * so search engines and AI crawlers can read every answer, matching the FAQPage markup.
 */
export function FaqList({ items, location }: { items: Faq[]; location: string }) {
  return (
    <Accordion.Root
      type="multiple"
      className="divide-y divide-line rounded-brand border border-line bg-white"
      onValueChange={(open) => {
        const latest = items.find((f) => f.id === open[open.length - 1]);
        if (latest) track("faq_open", { faq_question: latest.question.slice(0, 100), faq_location: location });
      }}
    >
      {items.map((f) => (
        <Accordion.Item key={f.id} value={f.id} id={`faq-${f.id}`}>
          <Accordion.Header asChild>
            <h3 className="font-sans text-base">
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 px-5 py-4.5 text-left text-[1.04rem] font-semibold text-navy-900 transition-colors hover:bg-mist sm:px-6">
                {f.question}
                <Plus aria-hidden className="mt-0.5 size-5 shrink-0 text-ember-text transition-transform duration-200 group-data-[state=open]:rotate-45" />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content
            forceMount
            className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
          >
            <p className="px-5 pb-5 text-ink-soft sm:px-6">{f.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
