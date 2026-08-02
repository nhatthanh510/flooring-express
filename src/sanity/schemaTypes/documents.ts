import { defineArrayMember, defineField, defineType } from "sanity";

import { aspectOptions } from "@/lib/layout-options";
import { iconField } from "@/sanity/schemaTypes/objects";

/** Shared trailing field — ordering is explicit everywhere, never array order. */
const orderField = defineField({
  name: "order",
  title: "Sort order",
  type: "number",
  description: "Lowest first. Controls the order this appears on the site.",
  validation: (rule) => rule.required(),
});

/**
 * The taxonomy root. Gallery projects and case studies both point at one of
 * these, and the slug is constrained to the three the design is built around —
 * the comparison table, plank toggle and filter pills all assume exactly three.
 */
export const flooringService = defineType({
  name: "flooringService",
  title: "Flooring service",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "string",
      options: {
        list: [
          { value: "hybrid", title: "Hybrid" },
          { value: "laminate", title: "Laminate" },
          { value: "timber", title: "Timber" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      description: 'Full name, e.g. "Hybrid Flooring"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      description: 'Used by filters and toggles, e.g. "Hybrid"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descriptor",
      type: "string",
      description: 'One word beside the plank chip, e.g. "Waterproof"',
      validation: (rule) => rule.required(),
    }),
    iconField,
    defineField({
      name: "plankColor",
      type: "string",
      description: "Hex colour of the plank chip on the comparison toggle.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^#[0-9a-fA-F]{6}$/, { name: "hex colour" })
          .error("Must be a 6-digit hex colour such as #735a3a."),
    }),
    defineField({
      name: "homeBlurb",
      type: "text",
      rows: 3,
      description: "Shown on the home page service cards.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homeFeatures",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().length(3).error("The card layout fits exactly three."),
    }),
    defineField({
      name: "servicesBlurb",
      type: "text",
      rows: 3,
      description: "Longer copy for the services page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicesFeatures",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().length(3).error("The card layout fits exactly three."),
    }),
    defineField({
      name: "image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    /**
     * A fixed-key object, not an array of rows: the comparison table renders
     * these five in a set order against hardcoded labels, and one service
     * missing a key would break the row alignment across all three columns.
     */
    defineField({
      name: "specs",
      title: "Comparison specs",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "coreMaterial", title: "Core Material", type: "string", validation: (r) => r.required() }),
        defineField({ name: "jankaRating", title: "Janka Rating", type: "string", validation: (r) => r.required() }),
        defineField({ name: "thickness", title: "Thickness", type: "string", validation: (r) => r.required() }),
        defineField({ name: "installation", title: "Installation Type", type: "string", validation: (r) => r.required() }),
        defineField({ name: "waterproof", title: "Waterproof Status", type: "string", validation: (r) => r.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "descriptor", media: "image" } },
});

/** A tile in the gallery masonry. Three of the six lead to a full case study. */
export const galleryProject = defineType({
  name: "galleryProject",
  title: "Gallery project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "subtitle",
      type: "string",
      description: 'Shown under the title in the overlay, e.g. "Hybrid Flooring"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "flooringService" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sector",
      type: "string",
      description: "The overlay eyebrow.",
      options: {
        list: [
          { value: "Residential", title: "Residential" },
          { value: "Commercial", title: "Commercial" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aspect",
      title: "Tile shape",
      type: "string",
      description: "Drives the masonry rhythm. Vary these so the grid doesn't read as a plain table.",
      options: { list: aspectOptions.map(({ value, title }) => ({ value, title })) },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", type: "imageWithAlt", validation: (rule) => rule.required() }),
    defineField({
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "A short, silent clip that plays on a loop in place of the photo. The photo above is still required — it is the poster frame, what search engines index, and what shows while the video loads or if it fails. Keep it under ~10 MB and a few seconds long: it downloads on every visit to the gallery. MP4 (H.264) plays everywhere; WebM is smaller but not supported on older Safari.",
    }),
    defineField({
      name: "caseStudy",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description:
        "Optional. With one, the tile links to the full case study; without, it links to the filtered gallery.",
    }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "subtitle", media: "image" } },
});

/**
 * The long-form project pages at /gallery/[slug].
 *
 * Almost every block is optional and each existing study uses a different
 * subset — the timber one ends at the "next project" link, the laminate one is
 * the only one with a roadmap. The rendering components already handle every
 * block being absent, so optionality here is load-bearing, not laziness.
 */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "blocks", title: "Optional blocks" },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "shortTitle", maxLength: 96 },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "flooringService" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "shortTitle",
      type: "string",
      description: 'Used by gallery cards and the "next project" link.',
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 3, group: "content", validation: (r) => r.required() }),
    defineField({ name: "hero", type: "imageWithAlt", group: "content", validation: (r) => r.required() }),

    defineField({
      name: "meta",
      title: "Key facts strip",
      type: "array",
      of: [defineArrayMember({ type: "metaItem" })],
      group: "blocks",
    }),
    defineField({
      name: "challenge",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "body", type: "text", rows: 6, validation: (r) => r.required() }),
        defineField({ name: "image", type: "imageWithAlt" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "body", type: "text", rows: 6, validation: (r) => r.required() }),
        defineField({ name: "image", type: "imageWithAlt" }),
        defineField({
          name: "stats",
          type: "array",
          of: [defineArrayMember({ type: "statChip" })],
        }),
      ],
    }),
    defineField({
      name: "features",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({
          name: "items",
          type: "array",
          of: [defineArrayMember({ type: "iconCard" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "specs",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({
          name: "rows",
          type: "array",
          of: [defineArrayMember({ type: "specRow" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "details",
      title: "Project details list",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "rows",
          type: "array",
          of: [defineArrayMember({ type: "metaItem" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "roadmap",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({
          name: "steps",
          type: "array",
          of: [defineArrayMember({ type: "iconCard" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "video",
      title: "Project video",
      type: "projectVideo",
      description:
        "Sits after the story and before the photo gallery. The gallery tile's short loop is a different thing — that one is silent, autoplaying and decorative; this is a video someone chooses to watch.",
      group: "blocks",
    }),
    defineField({
      name: "gallery",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({
          name: "images",
          type: "array",
          of: [defineArrayMember({ type: "imageWithAlt" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
        defineField({ name: "name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", type: "string", validation: (r) => r.required() }),
        defineField({ name: "image", type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      group: "blocks",
      fields: [
        defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ name: "primary", type: "link", validation: (r) => r.required() }),
        defineField({ name: "secondary", type: "link" }),
      ],
    }),

    defineField({ name: "seo", type: "seo", group: "seo", validation: (r) => r.required() }),
    { ...orderField, group: "content" },
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "shortTitle", subtitle: "eyebrow", media: "hero" } },
});

export const faqGroup = defineType({
  name: "faqGroup",
  title: "FAQ category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    iconField,
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "icon" } },
});

/**
 * One flat list rather than questions nested inside categories.
 *
 * The home page and the /faq page currently show entirely different questions.
 * Flat documents with a `group` reference and a `showOnHome` flag reproduce
 * that exactly, while letting an editor promote any question to the home page
 * without duplicating its text.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({
      name: "group",
      title: "Category",
      type: "reference",
      to: [{ type: "faqGroup" }],
      description: "Leave empty to show this question only on the home page.",
    }),
    defineField({
      name: "showOnHome",
      title: "Show on home page",
      type: "boolean",
      initialValue: false,
    }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", subtitle: "group.title" },
  },
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "document",
  fields: [
    defineField({
      name: "number",
      type: "string",
      description: 'Display label, e.g. "01" — kept as text so the leading zero survives.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});

export const documentTypes = [
  flooringService,
  galleryProject,
  caseStudy,
  faqGroup,
  faq,
  processStep,
];
