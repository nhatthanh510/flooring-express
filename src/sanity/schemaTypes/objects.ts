import { defineArrayMember, defineField, defineType } from "sanity";

import { iconKeys } from "@/lib/icons";

const iconList = iconKeys.map((value) => ({ value, title: value }));

/**
 * Every image in the app. `alt` is required rather than optional: the existing
 * content modules wrote deliberate alt text per image, and dropping to optional
 * would quietly let that accessibility work rot as editors add photos.
 *
 * Decorative images (the FAQ hero texture, the services CTA pattern) are the
 * exception and set `decorative`, which renders `alt=""` plus `aria-hidden`.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "What the image shows, for screen readers and when the image fails to load. Describe the content, not the fact that it is a photo.",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { decorative?: boolean } | undefined;
          if (parent?.decorative) return true;
          return value ? true : "Alt text is required unless the image is marked decorative.";
        }),
    }),
    defineField({
      name: "decorative",
      title: "Decorative only",
      type: "boolean",
      description:
        "Purely visual — a texture or pattern that carries no information. Hidden from screen readers.",
      initialValue: false,
    }),
  ],
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      description:
        "A site path such as /services or /services#hybrid, or a full https:// URL.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

/** Per-route `<title>` and `<meta name="description">`, also used by the OG card. */
export const seo = defineType({
  name: "seo",
  title: "Search & social",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.required().max(60).warning("Titles over ~60 characters get truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .max(160)
          .warning("Descriptions over ~160 characters get truncated in search results."),
    }),
    /**
     * The share card reuses the page's hero title but wants its own, shorter
     * supporting copy — 1200×630 has far less room than a search result.
     */
    defineField({
      name: "ogEyebrow",
      title: "Share card eyebrow",
      type: "string",
    }),
    defineField({
      name: "ogDescription",
      title: "Share card description",
      type: "text",
      rows: 2,
      validation: (rule) =>
        rule.max(90).warning("Longer text crowds the 1200×630 card."),
    }),
  ],
});

/** The band at the top of every page except the home page. */
export const pageHero = defineType({
  name: "pageHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "actions",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      description: "The first is styled as the primary button.",
      validation: (rule) => rule.max(2),
    }),
  ],
});

/** Eyebrow + title + optional description, above a section. */
export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

/** The full-bleed dark band that closes the FAQ and contact pages. */
export const closingBand = defineType({
  name: "closingBand",
  title: "Closing band",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "actions",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      validation: (rule) => rule.max(2),
    }),
  ],
});

/** The repeated "ready to start?" band near the foot of most pages. */
export const ctaBanner = defineType({
  name: "ctaBanner",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "primary", type: "link" }),
    defineField({ name: "secondary", type: "link" }),
    defineField({ name: "image", type: "imageWithAlt" }),
  ],
});

export const iconField = defineField({
  name: "icon",
  type: "string",
  description: "Picked from the app's icon registry (src/lib/icons.ts).",
  options: { list: iconList },
  validation: (rule) => rule.required(),
});

/** `{ label, value }` — key facts strips and definition lists. */
export const metaItem = defineType({
  name: "metaItem",
  title: "Fact",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

/** `{ attribute, value }` — the case-study technical spec tables. */
export const specRow = defineType({
  name: "specRow",
  title: "Specification",
  type: "object",
  fields: [
    defineField({ name: "attribute", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "attribute", subtitle: "value" } },
});

/** `{ value, label }` — the big numeric chips beside a case-study solution. */
export const statChip = defineType({
  name: "statChip",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

/** `{ icon, title, description }` — feature grids and roadmap steps. */
export const iconCard = defineType({
  name: "iconCard",
  title: "Card",
  type: "object",
  fields: [
    iconField,
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const openingHoursRow = defineType({
  name: "openingHoursRow",
  title: "Opening hours",
  type: "object",
  fields: [
    defineField({
      name: "days",
      type: "string",
      description: 'Full label, e.g. "Monday - Friday"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "short",
      type: "string",
      description: 'Narrow-column label, e.g. "Mon – Fri"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "time",
      type: "string",
      description: 'e.g. "8:00 AM - 6:00 PM" or "Closed"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "closed",
      type: "boolean",
      description: "Renders the row muted.",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "days", subtitle: "time" } },
});

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer column",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: { select: { title: "title" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      type: "string",
      description: "Which brand mark to show. Icons live in components/layout/social-icons.tsx.",
      options: { list: [{ value: "facebook", title: "Facebook" }] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      description: 'Accessible name, e.g. "Flooring Express on Facebook"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", type: "url", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const objectTypes = [
  imageWithAlt,
  link,
  seo,
  pageHero,
  sectionHeading,
  closingBand,
  ctaBanner,
  metaItem,
  specRow,
  statChip,
  iconCard,
  openingHoursRow,
  footerColumn,
  socialLink,
];
