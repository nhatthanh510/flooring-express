import { defineArrayMember, defineField, defineType } from "sanity";

import { aspectOptions } from "@/lib/layout-options";
import { iconField } from "@/sanity/schemaTypes/objects";

/** Shared trailing field — ordering is explicit everywhere, never array order. */
const orderField = defineField({
  name: "order",
  title: "Sort order",
  type: "number",
  description: "Lowest first; leave empty to sort last. Controls the order this appears on the site.",
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

/**
 * Base tile definition. The exported `galleryProject` below extends this with
 * the detail-page fields, so one document carries both the masonry tile and
 * its own detail page — no separate case-study document, no second slug.
 */
const galleryProjectBase = defineType({
  name: "galleryProject",
  title: "Gallery project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    // Below title, not above: "Generate" fills the slug FROM the title, so the
    // form has to read top-to-bottom or the button does nothing.
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hidden",
      title: "Hide from website",
      type: "boolean",
      description:
        "Keeps this document in the Studio without showing it anywhere on the public site. For demo references and work-in-progress.",
      initialValue: false,
    }),
    defineField({
      name: "subtitle",
      type: "string",
      description: 'Shown under the title in the overlay, e.g. "Hybrid Flooring"',
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
      initialValue: "Residential",
    }),
    defineField({
      name: "aspect",
      title: "Tile shape",
      type: "string",
      description: "Drives the masonry rhythm. Vary these so the grid doesn't read as a plain table.",
      options: { list: aspectOptions.map(({ value, title }) => ({ value, title })) },
      initialValue: "aspect-[4/3]",
    }),
    defineField({ name: "image", type: "imageWithAlt", validation: (rule) => rule.required() }),
    defineField({
      name: "video",
      title: "Video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "A short, silent clip that plays on a loop in place of the photo. The photo above is still required: it is the poster frame, what search engines index, and what shows while the video loads or if it fails. Keep it under ~10 MB and a few seconds long: it downloads on every visit to the gallery. MP4 (H.264) plays everywhere; WebM is smaller but not supported on older Safari.",
    }),
    defineField({
      name: "caseStudy",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description: "Legacy link, superseded by the Detail page tab.",
      hidden: true,
    }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "image", hidden: "hidden" },
    prepare: ({ title, subtitle, media, hidden }) => ({
      title,
      subtitle: hidden ? `HIDDEN FROM SITE · ${subtitle ?? ""}` : subtitle,
      media,
    }),
  },
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
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    // Below the titles it generates from — above them, the Generate button had
    // nothing to read and silently did nothing.
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => (doc.shortTitle as string) || (doc.title as string) || "",
        maxLength: 96,
      },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hidden",
      title: "Hide from website",
      type: "boolean",
      description:
        "Keeps this document in the Studio without showing it anywhere on the public site. For demo references and work-in-progress.",
      initialValue: false,
      group: "content",
    }),
    defineField({
      name: "shortTitle",
      type: "string",
      description: 'Used by gallery cards and the "next project" link.',
      group: "content",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "flooringService" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", type: "string", group: "content" }),
    defineField({ name: "summary", type: "text", rows: 3, group: "content" }),
    defineField({ name: "hero", type: "imageWithAlt", group: "content" }),

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
        "Sits after the story and before the photo gallery. The gallery tile's short loop is a different thing; that one is silent, autoplaying and decorative; this is a video someone chooses to watch.",
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

    defineField({ name: "seo", type: "seo", group: "seo" }),
    { ...orderField, group: "content" },
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", short: "shortTitle", subtitle: "eyebrow", media: "hero", hidden: "hidden" },
    prepare: ({ title, short, subtitle, media, hidden }) => ({
      title: short ?? title,
      subtitle: hidden ? `HIDDEN FROM SITE · ${subtitle ?? ""}` : subtitle,
      media,
    }),
  },
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
      description: 'Display label, e.g. "01", kept as text so the leading zero survives.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});

/**
 * The one project document: tile fields plus an optional detail page.
 *
 * The detail fields are the case-study fields, reused verbatim so the
 * rendering components keep working unchanged. Fill any of the Detail page
 * tab and the tile starts linking to /gallery/<slug>; leave the tab empty and
 * the tile is picture-only. The old standalone caseStudy type remains only
 * for the currently deployed build and is retired by the finalize script.
 */
const DETAIL_FIELD_NAMES = [
  "eyebrow",
  "summary",
  "hero",
  "meta",
  "challenge",
  "solution",
  "features",
  "specs",
  "details",
  "roadmap",
  "video",
  "gallery",
  "testimonial",
  "cta",
  "seo",
];

export const galleryProject = {
  ...galleryProjectBase,
  groups: [
    { name: "tile", title: "Gallery tile", default: true },
    { name: "detail", title: "Detail page" },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    ...galleryProjectBase.fields.map((field) => ({ ...field, group: "tile" })),
    defineField({
      name: "headline",
      title: "Detail page headline",
      type: "string",
      description:
        'Optional bigger headline for the detail page, e.g. "Bringing a Cottage Back, Board by Board". Falls back to the project title.',
      group: "detail",
    }),
    ...caseStudy.fields
      .filter((field) => DETAIL_FIELD_NAMES.includes(field.name))
      .map((field) => ({
        ...field,
        // The tile already has a `video` (the looping clip); the detail page's
        // watchable video block needs its own name.
        ...(field.name === "video"
          ? { name: "detailVideo", title: "Detail page video" }
          : {}),
        group: field.name === "seo" ? "seo" : "detail",
      })),
  ],
};

/**
 * Demo reference documents: the same shape as the real types, under their own
 * `_type`. That is the whole hiding mechanism — every site query selects
 * `_type == "galleryProject"` / `"caseStudy"`, so these can never render
 * publicly, on any deployed version, published or not. They exist purely as
 * fully-worked examples in the Studio.
 */
const demoOverride = <T extends { fields: Array<{ name: string }> }>(
  definition: T,
  name: string,
  title: string,
) => ({
  ...definition,
  name,
  title,
  fields: definition.fields.map((field) =>
    // The demo project's case-study link points at the demo case study type.
    field.name === "caseStudy"
      ? { ...field, to: [{ type: "demoCaseStudy" }] }
      : field,
  ),
});

export const demoGalleryProject = demoOverride(
  galleryProject,
  "demoGalleryProject",
  "Demo gallery example",
);
export const demoCaseStudy = demoOverride(
  caseStudy,
  "demoCaseStudy",
  "Demo case study example",
);

export const documentTypes = [
  flooringService,
  galleryProject,
  caseStudy,
  demoGalleryProject,
  demoCaseStudy,
  faqGroup,
  faq,
  processStep,
];
