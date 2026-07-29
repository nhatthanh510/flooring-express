import { defineArrayMember, defineField, defineType } from "sanity";

import { iconKeys } from "@/lib/icons";
import { bentoSpanOptions } from "@/lib/layout-options";

/**
 * Everything about the business itself. Rendered into the header, footer,
 * contact cards, the LocalBusiness JSON-LD on every page, the web manifest and
 * the OG cards.
 *
 * Note what is NOT here: the site's own origin. That stays in code
 * (`resolveSiteUrl()`), because it has to vary per deploy — Vercel preview,
 * tunnel, production — and a value typed into a CMS would silently break the
 * absolute og:image URL on every non-production build.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact & hours" },
    { name: "navigation", title: "Navigation" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({
      name: "legalName",
      type: "string",
      description: "The registered trading name, used in structured data.",
      group: "business",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string", group: "business", validation: (r) => r.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Default meta description, used on any page without its own.",
      group: "business",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      type: "text",
      rows: 3,
      description: "The short paragraph in the footer.",
      group: "business",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "business",
      options: { layout: "tags" },
    }),
    defineField({
      name: "stats",
      type: "object",
      group: "business",
      options: { columns: 2 },
      fields: [
        defineField({ name: "yearsExperience", type: "string", description: 'e.g. "15+"', validation: (r) => r.required() }),
        defineField({ name: "familiesServed", type: "string", description: 'e.g. "500+"', validation: (r) => r.required() }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "contact",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "phone", type: "string", description: 'As displayed, e.g. "(03) 6200 0000"', validation: (r) => r.required() }),
        defineField({ name: "phoneHref", type: "string", description: 'Dial link, e.g. "tel:+61362000000"', validation: (r) => r.required() }),
        defineField({ name: "email", type: "string", validation: (r) => r.required().email() }),
        defineField({ name: "street", type: "string", validation: (r) => r.required() }),
        defineField({ name: "locality", type: "string", description: "Suburb or city", validation: (r) => r.required() }),
        defineField({ name: "region", type: "string", description: 'State, e.g. "TAS"', validation: (r) => r.required() }),
        defineField({ name: "postcode", type: "string", validation: (r) => r.required() }),
        defineField({ name: "country", type: "string", description: 'ISO code, e.g. "AU"', validation: (r) => r.required() }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "notificationEmail",
      title: "Where quote enquiries are sent",
      type: "string",
      description:
        "Private — never shown on the site. Quote-form submissions are emailed here; a Gmail address is fine. Leave empty and they go to the public Email address above instead, which is also the one printed on the contact page, in the footer and in the site's structured data.",
      group: "contact",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "hours",
      type: "array",
      of: [defineArrayMember({ type: "openingHoursRow" })],
      group: "contact",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "hoursSummary",
      type: "string",
      description: 'One-line form for the footer, e.g. "Mon - Fri: 8am - 6pm"',
      group: "contact",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "openingHoursSpec",
      title: "Opening hours (structured data)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        'Schema.org format, one per line — e.g. "Mo-Fr 08:00-18:00". Must be kept in step with the hours table above; search engines read this one.',
      group: "contact",
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "serviceAreas",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Suburbs listed in the service-area section and structured data.",
      group: "contact",
      options: { layout: "tags" },
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: "navItems",
      title: "Header navigation",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      group: "navigation",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "headerCta",
      title: "Header button",
      type: "link",
      description:
        'The button at the right of the header, and the full-width one at the bottom of the mobile menu — e.g. "Free Quote" → /contact. Clear it to remove the button from both.',
      group: "navigation",
    }),
    defineField({
      name: "footerColumns",
      type: "array",
      of: [defineArrayMember({ type: "footerColumn" })],
      group: "navigation",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
      description: "Remove an entry to hide that icon from the footer.",
      group: "navigation",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

/** Shared shape for the six page singletons. */
function pageSingleton(
  name: string,
  title: string,
  extraFields: ReturnType<typeof defineField>[] = [],
) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "seo", title: "Search & social" },
    ],
    fields: [
      defineField({ name: "hero", type: "pageHero", group: "content" }),
      ...extraFields.map((field) => ({ ...field, group: "content" })),
      defineField({ name: "cta", type: "ctaBanner", group: "content" }),
      defineField({ name: "seo", type: "seo", group: "seo", validation: (r) => r.required() }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

export const homePage = pageSingleton("homePage", "Home page", [
  defineField({ name: "servicesHeading", type: "sectionHeading" }),
  defineField({
    name: "qualityBand",
    title: "Quality band",
    type: "object",
    fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 4 }),
      defineField({ name: "image", type: "imageWithAlt" }),
      defineField({
        name: "statLabel",
        type: "string",
        description: 'Caption under the years figure, e.g. "Years of Excellence"',
      }),
      defineField({
        name: "points",
        type: "array",
        of: [defineArrayMember({ type: "iconCard" })],
      }),
    ],
  }),
  defineField({
    name: "galleryHeading",
    title: "Featured work heading",
    type: "object",
    fields: [
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "title", type: "string" }),
      defineField({ name: "link", type: "link" }),
    ],
  }),
  /**
   * Tiles reference gallery projects rather than repeating their title and
   * photo, so the home page and the gallery can never drift apart — which is
   * exactly what the hand-written `bentoLayout` was enforcing by throwing.
   */
  defineField({
    name: "bentoTiles",
    title: "Featured work grid",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "bentoTile",
        fields: [
          defineField({
            name: "project",
            type: "reference",
            to: [{ type: "galleryProject" }],
            validation: (r) => r.required(),
          }),
          defineField({
            name: "span",
            title: "Tile size",
            type: "string",
            options: { list: bentoSpanOptions.map(({ value, title }) => ({ value, title })) },
          }),
        ],
        preview: { select: { title: "project.title", media: "project.image" } },
      }),
    ],
    validation: (r) => r.required().min(1),
  }),
  defineField({
    name: "faqSection",
    title: "FAQ section",
    type: "object",
    fields: [
      defineField({ name: "heading", type: "sectionHeading" }),
      defineField({ name: "image", type: "imageWithAlt" }),
      defineField({ name: "link", type: "link" }),
    ],
  }),
  defineField({
    name: "contactSection",
    type: "object",
    fields: [
      defineField({ name: "formTitle", type: "string" }),
      defineField({ name: "formDescription", type: "text", rows: 3 }),
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 3 }),
      defineField({
        name: "channelLabels",
        description: "The small labels above each contact detail.",
        type: "object",
        options: { columns: 3 },
        fields: [
          defineField({ name: "phone", type: "string" }),
          defineField({ name: "email", type: "string" }),
          defineField({ name: "address", type: "string" }),
        ],
      }),
      defineField({ name: "mapImage", type: "imageWithAlt" }),
    ],
  }),
]);

export const servicesPage = pageSingleton("servicesPage", "Services page", [
  defineField({ name: "comparisonHeading", type: "sectionHeading" }),
  defineField({ name: "processHeading", type: "sectionHeading" }),
  defineField({
    name: "processFootnote",
    type: "string",
    description: 'Small caps line under the rule, e.g. "Tasmanian owned & operated"',
  }),
]);

export const galleryPage = pageSingleton("galleryPage", "Gallery page");

export const aboutPage = pageSingleton("aboutPage", "About page", [
  defineField({
    name: "stats",
    title: "Stats bento",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "aboutStat",
        fields: [
          defineField({ name: "icon", type: "string" }),
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
          defineField({
            name: "inverted",
            type: "boolean",
            description: "Renders this card dark. The middle card is inverted in the design.",
            initialValue: false,
          }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }),
    ],
  }),
  /**
   * The only genuinely multi-paragraph prose in the site, so the only field
   * modelled as Portable Text. Everything else renders into a single <p> and
   * would gain nothing but markup churn from block content.
   */
  defineField({
    name: "missionStory",
    type: "object",
    fields: [
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "title", type: "string" }),
      defineField({
        name: "body",
        type: "array",
        of: [
          defineArrayMember({
            type: "block",
            styles: [{ value: "normal", title: "Paragraph" }],
            lists: [],
          }),
        ],
      }),
      defineField({ name: "image", type: "imageWithAlt" }),
      defineField({ name: "action", type: "link" }),
    ],
  }),
  defineField({
    name: "craftCards",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "craftCard",
        fields: [
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.required() }),
          defineField({ name: "image", type: "imageWithAlt", validation: (r) => r.required() }),
        ],
        preview: { select: { title: "title", media: "image" } },
      }),
    ],
  }),
  defineField({
    name: "specTable",
    type: "object",
    fields: [
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "description", type: "text", rows: 2 }),
      defineField({
        name: "rows",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "aboutSpecRow",
            fields: [
              defineField({ name: "type", type: "string", validation: (r) => r.required() }),
              defineField({ name: "durability", type: "string", validation: (r) => r.required() }),
              defineField({ name: "idealFor", title: "Ideal for", type: "string", validation: (r) => r.required() }),
              defineField({ name: "warranty", type: "string", validation: (r) => r.required() }),
            ],
            preview: { select: { title: "type", subtitle: "durability" } },
          }),
        ],
      }),
    ],
  }),
]);

export const faqPage = pageSingleton("faqPage", "FAQ page", [
  defineField({
    name: "searchPlaceholder",
    type: "string",
    description: "Placeholder text in the FAQ search box.",
  }),
  defineField({
    name: "supportCard",
    type: "object",
    fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 3 }),
      defineField({ name: "emailLabel", type: "string" }),
    ],
  }),
  defineField({ name: "closingBand", type: "closingBand" }),
]);

export const contactPage = pageSingleton("contactPage", "Contact page", [
  defineField({ name: "closingBand", type: "closingBand" }),
]);

/**
 * The 404 page.
 *
 * Not built on `pageSingleton`: that helper contributes a `pageHero` and a
 * `ctaBanner`, and this page has neither — its hero is a bare photo the "404"
 * numeral sits on, and a marketing CTA band under an error message is the wrong
 * note. It keeps the same `content`/`seo` group split so it feels the same to
 * edit.
 *
 * One heading and one `actions` array serve both breakpoints: the actions render
 * as stacked buttons on mobile and as a card grid from `md` up. Editors write
 * the copy once and it is correct on every screen.
 */
export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "Not found page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Search & social" },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Backdrop photo",
      type: "imageWithAlt",
      description:
        'Framed with the "404" numeral over it on phones, and faded behind the copy on desktop. A calm, uncluttered interior works best — busy photos fight the text.',
      group: "content",
    }),
    defineField({
      name: "icon",
      title: "Badge icon",
      type: "string",
      description: "Shown in the round badge above the heading, on desktop only.",
      options: { list: iconKeys.map((value) => ({ value, title: value })) },
      initialValue: "search",
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "string",
      description: 'The headline, e.g. "404 — Page not found".',
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [defineArrayMember({ type: "iconLink" })],
      description:
        "Where to send someone who has hit a dead end. The first is styled as the primary action. Four fills the desktop grid exactly.",
      group: "content",
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "helpPanel",
      title: "Help panel",
      type: "object",
      description:
        "The bordered panel of extra links under the actions. Leave the links empty to hide the whole panel.",
      group: "content",
      fields: [
        defineField({
          name: "title",
          type: "string",
          description: 'e.g. "Can\'t find what you\'re looking for?"',
        }),
        defineField({
          name: "links",
          type: "array",
          of: [defineArrayMember({ type: "link" })],
        }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Not found page" }) },
});

export const singletonTypes = [
  siteSettings,
  homePage,
  servicesPage,
  galleryPage,
  aboutPage,
  faqPage,
  contactPage,
  notFoundPage,
];

/** Used by structure.ts and the migration script — one document each, fixed id. */
export const singletonNames = singletonTypes.map((type) => type.name);
