import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/content/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  idPrefix,
  className,
}: {
  items: readonly Faq[];
  /** Keeps item values unique when several accordions share a page */
  idPrefix: string;
  className?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("flex flex-col gap-4", className)}
    >
      {items.map((faq, index) => (
        <AccordionItem
          key={faq.question}
          value={`${idPrefix}-${index}`}
          className="rounded-xl border border-border bg-card px-6 last:border-b"
        >
          <AccordionTrigger className="py-5 text-left text-body-lg font-semibold text-primary hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-body-md text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
