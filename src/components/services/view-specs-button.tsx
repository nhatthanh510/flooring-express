"use client";

import { Button } from "@/components/ui/button";
import { useSpecSelection } from "@/components/services/spec-selection";
import type { FlooringSlug } from "@/lib/content/services";

/**
 * Selects this product in the comparison table and scrolls to it, rather than
 * dropping the visitor at a section still showing a different material.
 *
 * It stays an anchor so it survives without JavaScript and supports
 * middle-click; the handler only enhances the default jump.
 */
// Only the serialisable fields cross the server → client boundary; the full
// service object carries a `LucideIcon` component, which cannot be passed.
export function ViewSpecsButton({
  slug,
  name,
}: {
  slug: FlooringSlug;
  name: string;
}) {
  const { select } = useSpecSelection();

  return (
    <Button asChild size="xl" variant="outline" className="mt-auto w-full">
      <a
        href="#compare"
        onClick={(event) => {
          event.preventDefault();
          select(slug);
        }}
      >
        View Specifications
        <span className="sr-only"> for {name}</span>
      </a>
    </Button>
  );
}
