"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { FlooringSlug } from "@/lib/flooring";

type SpecSelectionValue = {
  selected: FlooringSlug;
  select: (slug: FlooringSlug) => void;
};

const SpecSelectionContext = createContext<SpecSelectionValue | null>(null);

/**
 * Shares the comparison selection between the service cards and the "Compare
 * At A Glance" section, which live in different parts of the page.
 *
 * Server-rendered sections are passed through as `children`, so wrapping them
 * in this client provider does not opt the page out of static prerendering.
 */
export function SpecSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<FlooringSlug>("hybrid");

  const select = useCallback((slug: FlooringSlug) => {
    setSelected(slug);
    document
      .getElementById("compare")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <SpecSelectionContext.Provider value={{ selected, select }}>
      {children}
    </SpecSelectionContext.Provider>
  );
}

export function useSpecSelection() {
  const ctx = useContext(SpecSelectionContext);
  if (!ctx) {
    throw new Error(
      "useSpecSelection must be used within SpecSelectionProvider",
    );
  }
  return ctx;
}
