import { defineQuery } from "next-sanity";

import { IMAGE_PROJECTION } from "@/sanity/lib/image";

/**
 * Every GROQ query in the app, wrapped in `defineQuery` so `pnpm typegen` can
 * derive exact result types into sanity.types.ts.
 *
 * Fragments below are plain template strings spliced into the queries — GROQ has
 * no include mechanism, and repeating the image projection by hand is how these
 * drift out of step with `SanityImage`.
 */

const IMG = IMAGE_PROJECTION;

const LINK = /* groq */ `{ label, href }`;

const HERO = /* groq */ `{
  eyebrow,
  title,
  description,
  image ${IMG},
  actions[] ${LINK}
}`;

const CTA = /* groq */ `{
  title,
  description,
  primary ${LINK},
  secondary ${LINK},
  image ${IMG}
}`;

const SEO = /* groq */ `{ metaTitle, metaDescription, ogEyebrow, ogDescription }`;

const SECTION_HEADING = /* groq */ `{ eyebrow, title, description }`;

const CLOSING_BAND = /* groq */ `{ title, description, actions[] ${LINK} }`;

const ICON_CARD = /* groq */ `{ icon, title, description }`;

const ICON_LINK = /* groq */ `{ icon, label, href }`;

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    name,
    legalName,
    tagline,
    description,
    blurb,
    keywords,
    stats{ yearsExperience, familiesServed },
    contact,
    notificationEmail,
    hours[]{ days, short, time, closed },
    hoursSummary,
    openingHoursSpec,
    serviceAreas,
    navItems[]{ label, href },
    headerCta ${LINK},
    footerColumns[]{ title, links[]{ label, href } },
    socialLinks[]{ icon, label, href }
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "flooringService"] | order(order asc){
    slug,
    name,
    shortName,
    descriptor,
    icon,
    plankColor,
    homeBlurb,
    homeFeatures,
    servicesBlurb,
    servicesFeatures,
    image ${IMG},
    specs
  }
`);

export const PROCESS_STEPS_QUERY = defineQuery(`
  *[_type == "processStep"] | order(order asc){ number, title, description }
`);

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export const HOME_FAQS_QUERY = defineQuery(`
  *[_type == "faq" && showOnHome == true] | order(order asc){ question, answer }
`);

/** Categories with their questions nested, for the /faq browser. */
export const FAQ_GROUPS_QUERY = defineQuery(`
  *[_type == "faqGroup"] | order(order asc){
    title,
    icon,
    "items": *[_type == "faq" && group._ref == ^._id] | order(order asc){ question, answer }
  }
`);

/** Flat list behind the FAQPage structured data. */
export const ALL_FAQS_QUERY = defineQuery(`
  *[_type == "faq" && defined(group)] | order(order asc){ question, answer }
`);

// ---------------------------------------------------------------------------
// Gallery & case studies
// ---------------------------------------------------------------------------

export const GALLERY_PROJECTS_QUERY = defineQuery(`
  *[_type == "galleryProject"] | order(order asc){
    "slug": slug.current,
    title,
    subtitle,
    "category": category->slug,
    sector,
    aspect,
    image ${IMG},
    video{ asset->{ url, mimeType } },
    "caseStudy": caseStudy->slug.current
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    "category": category->slug,
    eyebrow,
    title,
    shortTitle,
    summary,
    order,
    hero ${IMG},
    meta[]{ label, value },
    challenge{ heading, body, image ${IMG} },
    solution{ heading, body, image ${IMG}, stats[]{ value, label } },
    features{ heading, description, items[] ${ICON_CARD} },
    specs{ heading, description, rows[]{ attribute, value } },
    details{ heading, rows[]{ label, value } },
    roadmap{ heading, description, steps[] ${ICON_CARD} },
    video{
      heading,
      description,
      url,
      file{ asset->{ url, mimeType } },
      poster ${IMG}
    },
    gallery{ heading, images[] ${IMG} },
    testimonial{ quote, name, role, image ${IMG} },
    cta{ heading, description, primary ${LINK}, secondary ${LINK} },
    seo ${SEO}
  }
`);

/**
 * The study after this one, wrapping to the first — the array-modulo behaviour
 * of the old `getNextCaseStudy`, expressed against the explicit `order` field.
 */
export const NEXT_CASE_STUDY_QUERY = defineQuery(`
  coalesce(
    *[_type == "caseStudy" && order > $order] | order(order asc)[0],
    *[_type == "caseStudy"] | order(order asc)[0]
  ){
    "slug": slug.current,
    shortTitle,
    eyebrow,
    hero ${IMG}
  }
`);

/** Title/eyebrow/summary only, for the per-study OG card. */
export const CASE_STUDY_OG_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{ title, eyebrow, summary }
`);

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    hero ${HERO},
    servicesHeading ${SECTION_HEADING},
    qualityBand{
      title,
      description,
      image ${IMG},
      statLabel,
      points[] ${ICON_CARD}
    },
    galleryHeading{ eyebrow, title, link ${LINK} },
    bentoTiles[]{
      span,
      "project": project->{
        title,
        subtitle,
        "slug": slug.current,
        "category": category->slug,
        "caseStudy": caseStudy->slug.current,
        image ${IMG}
      }
    },
    faqSection{ heading ${SECTION_HEADING}, image ${IMG}, link ${LINK} },
    contactSection{
      formTitle,
      formDescription,
      title,
      description,
      channelLabels,
      mapImage ${IMG}
    },
    seo ${SEO}
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage"][0]{
    hero ${HERO},
    comparisonHeading ${SECTION_HEADING},
    processHeading ${SECTION_HEADING},
    processFootnote,
    cta ${CTA},
    seo ${SEO}
  }
`);

export const GALLERY_PAGE_QUERY = defineQuery(`
  *[_id == "galleryPage"][0]{ hero ${HERO}, cta ${CTA}, seo ${SEO} }
`);

/**
 * Read by `app/not-found.tsx`, which serves both unmatched URLs and every
 * `notFound()` call in the app.
 */
export const NOT_FOUND_PAGE_QUERY = defineQuery(`
  *[_id == "notFoundPage"][0]{
    image ${IMG},
    icon,
    heading,
    description,
    actions[] ${ICON_LINK},
    helpPanel{ title, links[] ${LINK} },
    seo ${SEO}
  }
`);

/** Read by /thank-you, where the quote form lands after a successful send. */
export const QUOTE_SUCCESS_PAGE_QUERY = defineQuery(`
  *[_id == "quoteSuccessPage"][0]{
    heading,
    description,
    image ${IMG},
    stepsHeading,
    steps[]{ title, description },
    actions[] ${LINK},
    urgentText,
    seo ${SEO}
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0]{
    hero ${HERO},
    stats[]{ icon, title, description, inverted },
    missionStory{ eyebrow, title, body, image ${IMG}, action ${LINK} },
    craftCards[]{ title, description, image ${IMG} },
    specTable{ heading, description, rows[]{ type, durability, idealFor, warranty } },
    cta ${CTA},
    seo ${SEO}
  }
`);

export const FAQ_PAGE_QUERY = defineQuery(`
  *[_id == "faqPage"][0]{
    hero ${HERO},
    searchPlaceholder,
    supportCard{ title, description, emailLabel },
    closingBand ${CLOSING_BAND},
    seo ${SEO}
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0]{
    hero ${HERO},
    closingBand ${CLOSING_BAND},
    seo ${SEO}
  }
`);

/** Everything sitemap.ts needs, in one round trip. */
export const SITEMAP_QUERY = defineQuery(`
  {
    "caseStudies": *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current },
    "navItems": *[_id == "siteSettings"][0].navItems[]{ href }
  }
`);
