import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/content/faqs";
import { cn } from "@/lib/utils";

type Variant = "card" | "divided";

/**
 * Two looks from the mockups:
 *  - "card"    — bordered white cards, used on the FAQ page
 *  - "divided" — borderless rows split by a hairline, used on the home page
 */
export function FaqAccordion({
  items,
  idPrefix,
  variant = "card",
  className,
}: {
  items: readonly Faq[];
  /** Keeps item values unique when several accordions share a page */
  idPrefix: string;
  variant?: Variant;
  className?: string;
}) {
  const divided = variant === "divided";

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("flex w-full flex-col", divided ? "gap-0" : "gap-4", className)}
    >
      {items.map((faq, index) => (
        <AccordionItem
          key={faq.question}
          value={`${idPrefix}-${index}`}
          className={cn(
            divided
              ? "border-b border-border last:border-b-0"
              : "rounded-xl border border-border bg-card px-6 last:border-b",
          )}
        >
          <AccordionTrigger
            className={cn(
              "group/faq text-left hover:no-underline",
              divided
                ? "py-6 text-headline-md text-primary transition-colors hover:text-secondary"
                : "py-6 text-body-lg font-semibold text-primary",
            )}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "text-body-md leading-relaxed text-muted-foreground",
              divided ? "pb-6 pr-8" : "pb-6",
            )}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
