/**
 * Layout classes that are chosen by an editor rather than written in a
 * component.
 *
 * These are the one place where Tailwind class names legitimately live in
 * content. They must stay as literal strings in a file under `src/`, because
 * Tailwind v4 only generates a class it can actually see while scanning source
 * — a class that exists solely as a string inside a Sanity document would never
 * be compiled, and the layout would silently collapse.
 *
 * Both lists are exposed to the Studio as fixed dropdowns (`options.list`), so
 * an editor can pick a rhythm but cannot invent a class.
 */

export const aspectOptions = [
  { value: "aspect-[3/4]", title: "Portrait (3:4)" },
  { value: "aspect-[4/3]", title: "Landscape (4:3)" },
  { value: "aspect-square", title: "Square (1:1)" },
  { value: "aspect-[4/5]", title: "Tall (4:5)" },
  { value: "aspect-[3/2]", title: "Wide (3:2)" },
] as const;

export type AspectOption = (typeof aspectOptions)[number]["value"];

export const bentoSpanOptions = [
  { value: "", title: "Single cell" },
  { value: "md:col-span-2", title: "Two columns wide" },
  { value: "md:col-span-2 md:row-span-2", title: "Large (2 × 2)" },
] as const;

export type BentoSpanOption = (typeof bentoSpanOptions)[number]["value"];
