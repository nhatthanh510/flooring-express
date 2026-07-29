<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Content belongs in Sanity, not in the source

Any new feature that renders text, images, links or lists must take that content
from Sanity. Hardcoding it into a component is the exception and needs a reason.

When adding a feature:

- Add or extend a schema type in `src/sanity/schemaTypes/`, add a GROQ query in
  `src/sanity/queries.ts`, and read it through `sanityFetch`.
- Run `npm run typegen` after any schema or query change, and use the generated
  types from `src/sanity/types.ts` — never hand-write the shape of a query result.
- New singletons need an entry in `singletonTypes` (`schemaTypes/singletons.ts`),
  which is what pins them to a fixed document id and puts them in the Studio's
  Pages list. Author the document in the Studio once — there is no seed script,
  so an unauthored singleton renders as a blank section until someone fills it.
- Sanity cannot store a React component or a Tailwind class. Anything of that
  kind is a **string key resolved through a registry in code** — see
  `src/lib/icons.ts` for the established pattern. The registry keys double as the
  `options.list` on the schema field, so an editor cannot pick a value that
  renders nothing.
- Treat every field as nullable. GROQ promises nothing, an editor can empty any
  field, and a section with no content should collapse rather than render an
  empty heading or throw.

## New UI is not done until it is editable and seeded

Shipping a component that renders the right pixels from hardcoded strings is a
half-finished feature. Every piece of new UI needs all three:

1. **A schema field** for every string, image, link and list it renders.
2. **Seeded content in Sanity** that reproduces the design. Write it with
   `@sanity/client` and `SANITY_API_WRITE_TOKEN` from `.env`. A schema with no
   document behind it renders an empty page, which is indistinguishable from a
   bug.
3. **A screenshot check** against the mockup at both breakpoints, after seeding.
   Comparing against an unauthored page proves nothing.

Watch for the specific failure this rule exists to catch: a label typed straight
into JSX because it "never changes" — a nav CTA, a button label, a section
heading. Those are exactly the strings a client asks to change first.

When a Stitch mockup exists, read its markup rather than eyeballing the
screenshot, and carry over the real values — the token names, the type scale, the
spacing. Check the mockup for the specific page you are building: shared
components legitimately differ between pages, so confirm before assuming one
treatment applies everywhere.

**What stays in code**, and why — the line is whether an editor changing it could
break a deploy:

- Anything that varies per deploy: the site origin (`resolveSiteUrl()`), env vars,
  API tokens.
- Route paths, `generateStaticParams` behaviour, and anything the router or build
  depends on.
- Layout, spacing and visual treatment. Editors supply content and choices from a
  fixed list; they do not supply CSS.
- Legally or structurally fixed strings such as schema.org type names.
