# Flooring Express Hobart

Marketing site for a Hobart flooring installation business — Hybrid, Laminate and Timber.

Built from the [Stitch design](https://stitch.withgoogle.com/projects/4391856311392807811); the **Timber & Slate** design system is documented in [`DESIGN.md`](./DESIGN.md).

**Phase 1 is static — there is no CMS and no backend.** All copy lives in typed
modules under `src/lib/content/`, all images are local, and the quote form
validates client-side and shows a simulated success state.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui
(radix base) · react-hook-form + zod · lucide-react

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Layout

```
src/
├── app/
│   ├── layout.tsx           fonts (Montserrat + Inter), base metadata, viewport
│   ├── globals.css          Tailwind v4 @theme — the whole design system
│   ├── sitemap.ts robots.ts
│   └── (marketing)/         shared header/footer, five pages + gallery/[slug]
├── components/
│   ├── ui/                  shadcn components
│   ├── layout/ shared/      header, mobile nav, footer, hero, CTA, reveal
│   ├── home/ services/ gallery/ about/ contact/
│   ├── projects/            composable case-study sections + icon map
│   └── forms/               quote-form, newsletter-input
└── lib/
    ├── site-config.ts       business details, nav, footer links
    ├── content/             services, projects, case-studies, process, about
    ├── schemas/quote.ts     zod schema shared by both quote forms
    └── submit-quote.ts      the only place the app talks to the outside world
```

## Design tokens

`src/app/globals.css` is the single source of truth. `:root` maps `DESIGN.md`
onto shadcn's semantic variables (`--primary`, `--secondary`, `--muted`, …); the
`@theme` block adds the brand scales that compile to utilities:

| Utility | Example |
| --- | --- |
| Brand colours | `bg-ink`, `text-oak`, `bg-sand`, `border-hairline`, `bg-surface-low` |
| Type scale | `text-display-lg`, `text-headline-lg`, `text-body-md`, `text-label-sm` |
| Layout | `py-section` (80px), `gap-gutter` (24px), `max-w-page` (1280px) |
| Elevation | `shadow-ambient`, `shadow-ambient-lifted` |
| Helpers | `.container-page`, `.glass-panel`, `.zebra-rows` |

The site is light-mode only — `DESIGN.md` defines no dark palette. Because every
component uses semantic tokens, adding one later means adding a `.dark` block,
not touching components.

## Before launch

1. **Replace the placeholder contact details** in `src/lib/site-config.ts`. The
   mockups disagreed with each other on the email domain, phone format and
   closing time; the current values are the most common variant of each, not
   confirmed business data.
2. **Wire up the quote form.** `submitQuote()` in `src/lib/submit-quote.ts`
   currently resolves after a delay. Swap its body for the real API/CRM call —
   nothing else needs to change. `subscribeToNewsletter()` is the same shape.
3. **Set `siteConfig.url`** to the real domain so `metadataBase`, the sitemap
   and the JSON-LD resolve correctly.
4. **Replace the imagery.** `public/images/` holds the AI-generated placeholders
   from the Stitch mockup (~1376×768 WebP). Alt text is written per image in the
   content modules and should be re-checked against the real photos.
5. **Set the social URLs.** `socialLinks` in `site-config.ts` points at the
   Facebook and Instagram home pages, not real profiles. Add the real URLs or
   delete an entry to hide that icon. The footer's "Privacy Policy" / "Terms of
   Service" links from the mockup are also not built yet — the Quick Links
   column currently points at pages that exist instead.

## Where CTAs go

Every call to action carries an **enquiry intent**, so no two buttons land on an
identical form. `/contact` reads `?enquiry=` and `?flooring=` and adapts its
heading, description, submit label and preselected options
(`enquiryCopy` in `lib/schemas/quote.ts`). The four intents are `quote`,
`samples`, `consultation` and `commercial`. The regression suite asserts that no
page has two CTAs pointing at the same contact URL.

## Notes

- `/gallery` is server-rendered on demand because it reads `?category=`; the
  filter pills are real links, so filtered views are shareable, crawlable, and
  work without JavaScript. Every other route is statically prerendered — the
  three case studies via `generateStaticParams`.
- Icons are `lucide-react` components, mapped from the Material Symbols used in
  the mockups.
- `pnpm screenshots` (dev server running) captures every route at 1440px and
  390px into `screenshots/`, and reports horizontal overflow, console errors and
  failed requests. Override with `BASE=`, `ROUTES=`, `OUT=`.
- `pnpm regression` runs the functional suite — link integrity, gallery filters
  and card links, quote-form validation and success, the plank toggle, mobile
  nav, footer structure, and that card hover stays on the compositor.

### Typography

Per `DESIGN.md`, **Montserrat is for the display/headline scale only; Inter is
for body and UI text.** Most page text is body text, so Inter is what you'll see
most of the time — that is the design, not a loading failure. In DevTools the
computed stack reads `Inter, "Inter Fallback"`; `"Inter Fallback"` is `next/font`'s
metric-matched local fallback and always sits second in the stack. Check the
"Rendered Fonts" section instead to see what actually painted.

If you want Montserrat as the base font for everything (the Stitch
implementation guide suggests `sans: Montserrat`, contradicting `DESIGN.md`),
change `--font-sans` in `globals.css` to `var(--font-montserrat)` and add the
lighter Montserrat weights to the `next/font` call in `app/layout.tsx`.

### Where mockups disagree

Stitch generated the desktop and mobile screens independently, so they conflict
in places. The rule applied throughout: **desktop wins on copy, mobile wins on
layout mechanics.** Concretely, the mobile screens' alternative hero wording,
white hero buttons and dropped section eyebrows were not adopted; their
centred mobile alignment, 28px mobile headings and full-width stacked buttons
were. Contact details differ between screens too — see "Before launch" above.
