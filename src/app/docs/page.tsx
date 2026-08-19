import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import {
  ArrowLeft,
  BookOpen,
  CircleAlert,
  CircleHelp,
  Clock,
  ExternalLink,
  ImagePlus,
  Lightbulb,
  Link2,
  ListOrdered,
  Phone,
} from "lucide-react";

import { Link } from "@/components/shared/link";

import { ContentsNav } from "./contents-nav";
import studioContentList from "./img/studio-content-list.png";
import studioEditor from "./img/studio-editor.png";
import studioLogin from "./img/studio-login.png";
import studioPresentation from "./img/studio-presentation.png";

/**
 * The editor onboarding guide at /docs, laid out per the standalone Stitch
 * "Admin Portal" mockup: its own slim header, no site footer, a sticky
 * Contents sidebar, and a step-by-step walkthrough written for a non-technical
 * reader — one instruction and one real screenshot per step, minimal prose.
 *
 * This page is the deliberate exception to "content belongs in Sanity": it
 * documents Sanity, so it has to render for someone who does not yet have an
 * account and cannot be broken by the editing it teaches. It lives outside
 * the (marketing) route group on purpose — the design gives it its own
 * chrome, and the marketing layout throws without a siteSettings document.
 *
 * Screenshots come from the real Studio via `pnpm docs-screenshots` — re-run
 * it when the Studio UI or desk structure changes.
 *
 * Copy conventions: no em dashes in the visible text (client preference), and
 * apostrophes are the typographic ’, never &apos; — this Next build trims the
 * whitespace around any text run it entity-escapes.
 *
 * Unlinked from the navigation and noindexed: it is for the people who run
 * the site, not its visitors. Send new editors the URL.
 */

const STUDIO_URL = "https://www.flooringexpress.com.au/studio";

export const metadata: Metadata = {
  title: "Website Management Guide | Flooring Express",
  description:
    "Step-by-step guide to signing in to the Flooring Express studio and updating the website.",
  // Internal documentation — of no use to a searcher looking for flooring.
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* Building blocks, styled per the mockup. Presentation only.          */
/* ------------------------------------------------------------------ */

type IconType = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

/** A breadcrumb-style path through the Studio UI. */
function Path({ steps }: { steps: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 align-baseline">
      {steps.map((step, i) => (
        <span key={step} className="inline-flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              →
            </span>
          )}
          <span className="rounded-md bg-surface-high px-1.5 py-0.5 text-[13px] font-medium text-foreground">
            {step}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Literal text the reader types or sees — a URL, a field value. */
function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-surface-high px-1.5 py-0.5 font-mono text-[13px] text-foreground">
      {children}
    </code>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-6">
      <h2 className="border-b border-border pb-2 text-headline-lg-mobile text-primary md:text-headline-lg">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** One numbered step of the walkthrough: a surface-low card, few words, one
 *  screenshot. The mockup's cards lead with a single glyph before the title —
 *  here that glyph is the step number. */
function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface-low p-5 md:p-6">
      <h3 className="flex items-center gap-3 text-headline-md text-primary">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary font-sans text-sm font-bold text-secondary-foreground"
        >
          {number}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

/** A short reference card for one everyday task: top icon, heading, text,
 *  per the mockup's two-column grid cards. */
function Task({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded border border-border bg-background p-5 transition-shadow hover:shadow-ambient">
      <Icon className="mb-1 size-7 text-secondary" aria-hidden={true} />
      <h3 className="font-display text-lg font-semibold text-primary">
        {title}
      </h3>
      <div className={`${prose} space-y-2`}>{children}</div>
    </div>
  );
}

/** The mockup's "Pro Tip" info box: secondary-container on-secondary-container. */
function ProTip({
  label = "Good to know",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded bg-accent p-4 text-accent-foreground">
      <Lightbulb
        className="mt-1 size-5 shrink-0 fill-current"
        aria-hidden={true}
      />
      <div>
        <strong className="mb-1 block text-label-md">{label}</strong>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}

/** Same shape as ProTip in the error palette, for the one hard warning. */
function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded bg-destructive/10 p-4 text-foreground">
      <CircleAlert
        className="mt-1 size-5 shrink-0 text-destructive"
        aria-hidden={true}
      />
      <div>
        <strong className="mb-1 block text-label-md text-destructive">
          If in doubt
        </strong>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}

/** A real-Studio screenshot in the mockup's bordered-card treatment. */
function Screenshot({
  image,
  alt,
  caption,
  priority = false,
}: {
  image: StaticImageData;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-background">
      <Image
        src={image}
        alt={alt}
        sizes="(min-width: 768px) 48rem, 100vw"
        priority={priority}
        className="w-full"
      />
      <figcaption className="border-t border-border bg-background px-4 py-3 text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

const ol = "list-decimal space-y-2 pl-5 text-body-md text-muted-foreground";
const ul = "list-disc space-y-2 pl-5 text-body-md text-muted-foreground";
const prose =
  "text-body-md text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground";

const CONTENTS = [
  ["getting-started", "Getting Started"],
  ["everyday-tasks", "Everyday Tasks"],
  ["photos", "Photos"],
  ["help", "Help"],
] as const;

export default function DocsPage() {
  return (
    <>
      {/* Standalone "Admin Portal" header, per the mockup — this page does
          not share the marketing chrome. */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        {/* Same max-width and gutters as the content wrapper below, so the
            wordmark left-aligns with the Contents sidebar at every width. */}
        <div className="mx-auto flex w-full max-w-page items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
          <div className="flex items-center gap-4">
            <span className="text-headline-md font-bold text-primary">
              Flooring Express
            </span>
            <span aria-hidden="true" className="hidden h-6 w-px bg-border md:block" />
            <span className="hidden text-label-md uppercase tracking-wider text-muted-foreground md:block">
              Admin Portal
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-label-md text-muted-foreground transition-colors duration-200 hover:text-secondary"
          >
            <ArrowLeft className="size-5" aria-hidden={true} />
            <span className="hidden md:inline">Back to Site</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-page flex-grow flex-col gap-gutter px-margin-mobile py-10 md:flex-row md:px-margin-desktop md:py-section">
        {/* Contents sidebar — sticky, desktop only, per the mockup. */}
        <aside className="sticky top-24 hidden h-fit w-64 flex-shrink-0 md:block">
          <ContentsNav items={CONTENTS} />
        </aside>

        <main className="flex max-w-3xl flex-grow flex-col gap-14 md:gap-section">
          {/* Hero + the five steps */}
          <section
            id="getting-started"
            className="flex scroll-mt-24 flex-col gap-4"
          >
            <p className="inline-flex items-center gap-2 text-label-md uppercase tracking-wider text-secondary">
              <BookOpen className="size-4" aria-hidden={true} />
              Documentation
            </p>
            <h1 className="text-headline-lg-mobile text-primary md:text-display-lg">
              Website Management Guide
            </h1>
            <p className="text-body-lg text-muted-foreground">
              How to update the website yourself. No technical knowledge
              needed: follow these five steps once, and after that changing
              anything takes about a minute.
            </p>

            <div className="mt-6 flex flex-col gap-5 md:mt-10">
              <Step number={1} title="Go to the Studio">
                <p className={prose}>
                  The <strong>Studio</strong> is the website’s control panel.
                  It lives at this address, so <strong>bookmark it</strong>:
                </p>
                <a
                  href={STUDIO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 break-all rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm font-medium text-primary transition-colors hover:border-secondary hover:text-secondary"
                >
                  {STUDIO_URL}
                  <ExternalLink
                    className="size-4 shrink-0"
                    aria-hidden={true}
                  />
                </a>
                <p className={prose}>
                  When it opens, you’ll see this sign-in screen:
                </p>
                <Screenshot
                  image={studioLogin}
                  alt="The Studio sign-in screen with Google, GitHub and email/password buttons."
                  caption="The sign-in screen. Most people press Google."
                  priority
                />
              </Step>

              <Step number={2} title="Sign in, or ask for access">
                <p className={prose}>
                  Press <strong>Google</strong> and pick your usual email
                  account. The account is free.
                </p>
                <ul className={ul}>
                  <li>
                    <strong>First time?</strong> You need an invitation. Ask
                    your developer to send you one, then look for an email from{" "}
                    <strong>Sanity</strong> in your inbox and press{" "}
                    <strong>Accept invitation</strong>. (Check spam if it
                    hasn’t arrived in a few minutes.)
                  </li>
                  <li>
                    Sign in with the <strong>same email address</strong> the
                    invitation was sent to.
                  </li>
                </ul>
                <ProTip>
                  Always sign in the same way. If you used Google the first
                  time, use Google every time.
                </ProTip>
              </Step>

              <Step number={3} title="Have a look around">
                <p className={prose}>
                  After signing in, you land on the content page. Everything on
                  the website lives in these folders. None of it is “in the
                  code”:
                </p>
                <Screenshot
                  image={studioContentList}
                  alt="The Studio’s Content menu: Site settings, Pages, Flooring services, Gallery projects, FAQ categories, FAQs and Process steps."
                  caption="The content page: every part of the website, in folders."
                />
                <ul className={ul}>
                  <li>
                    <strong>Site settings</strong>: phone number, email,
                    opening hours, the menu
                  </li>
                  <li>
                    <strong>Pages</strong>: the words and pictures on each page
                    (Home, Services, About…)
                  </li>
                  <li>
                    <strong>Gallery projects</strong>: the photos on the
                    Gallery page
                  </li>
                  <li>
                    <strong>FAQs</strong>: the questions and answers
                  </li>
                </ul>
                <ProTip>
                  You can’t break anything by clicking around. Nothing goes
                  live until you press Publish.
                </ProTip>
              </Step>

              <Step number={4} title="Change something">
                <p className={prose}>
                  You don’t need to hunt through folders. Press{" "}
                  <strong>Presentation</strong> at the top of the Studio:
                </p>
                <Screenshot
                  image={studioPresentation}
                  alt="The Presentation tab: the live website on the left and the editing panel on the right."
                  caption="Presentation: the website on the left, the editor on the right."
                />
                <ol className={ol}>
                  <li>
                    <strong>Click</strong> any text or photo on the website
                    preview.
                  </li>
                  <li>
                    <strong>Type</strong> your change in the box that opens on
                    the right. The preview updates as you type.
                  </li>
                  <li>
                    That’s it. Your work saves itself as a{" "}
                    <strong>draft</strong>, and the public site hasn’t changed
                    yet.
                  </li>
                </ol>
              </Step>

              <Step number={5} title="Press Publish">
                <p className={prose}>
                  When you’re happy, press <strong>Publish</strong>{" "}
                  (bottom-right corner). Your change is live on the website
                  within a few seconds.
                </p>
                <Screenshot
                  image={studioEditor}
                  alt="A page open for editing in the Studio, with the Publish button in the bottom-right corner."
                  caption="The Publish button lives in the bottom-right corner, whichever way you edit."
                />
                <ul className={ul}>
                  <li>
                    Made a mistake? The <strong>⋮</strong> menu next to Publish
                    can restore any earlier version.{" "}
                    <strong>Nothing is ever lost.</strong>
                  </li>
                  <li>
                    Site not showing your change? Wait 30 seconds, then refresh
                    with <Mono>Cmd+Shift+R</Mono> (Mac) or{" "}
                    <Mono>Ctrl+Shift+R</Mono> (Windows).
                  </li>
                </ul>
              </Step>
            </div>
          </section>

          {/* Everyday tasks — short reference cards */}
          <Section id="everyday-tasks" title="Everyday Tasks">
            <p className={prose}>
              Quick recipes. Each one starts from the folders in Step 3, and
              always ends the same way: <strong>press Publish</strong>.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Task icon={Phone} title="Change the phone number">
                <p>
                  <Path steps={["Site settings", "Contact & hours"]} />
                </p>
                <p>
                  Fill in <strong>both</strong> phone fields.{" "}
                  <strong>Phone</strong> is what people see, like{" "}
                  <Mono>(03) 6200 0000</Mono>. <strong>Phone href</strong> is
                  what a mobile dials: <Mono>tel:+61362000000</Mono>.
                </p>
              </Task>

              <Task icon={Clock} title="Change opening hours">
                <p>
                  <Path steps={["Site settings", "Contact & hours"]} />
                </p>
                <p>
                  There are three hour fields (contact page, footer, Google).
                  Update <strong>all three</strong> so they say the same thing.
                </p>
              </Task>

              <Task icon={ImagePlus} title="Add a photo to the gallery">
                <p>
                  <Path steps={["Gallery projects", "+ Create"]} />
                </p>
                <p>
                  Add a title, pick the flooring type, upload the photo, set{" "}
                  <strong>Sort order</strong> (lowest number shows first).
                </p>
              </Task>

              <Task icon={CircleHelp} title="Add a question to the FAQ">
                <p>
                  <Path steps={["FAQs", "+ Create"]} />
                </p>
                <p>
                  Type the question, the answer, and pick a{" "}
                  <strong>category</strong>. Tick{" "}
                  <strong>Show on home page</strong> to feature it there too.
                </p>
              </Task>

              <Task icon={Link2} title="Change the menu or footer links">
                <p>
                  <Path steps={["Site settings", "Navigation"]} />
                </p>
                <p>
                  Every link is a <strong>label</strong> (what people see) and
                  an <strong>href</strong> (where it goes, like{" "}
                  <Mono>/services</Mono>).
                </p>
              </Task>

              <Task icon={ListOrdered} title="Put things in a different order">
                <p>
                  Everything in a list has a <strong>Sort order</strong>{" "}
                  number, and the lowest shows first. Leave gaps (10, 20, 30)
                  so you can slot things in later.
                </p>
              </Task>
            </div>
            <ProTip label="Where quote enquiries go">
              <Path
                steps={[
                  "Site settings",
                  "Contact & hours",
                  "Where quote enquiries are sent",
                ]}
              />
              . This email is private and never shown on the website.
            </ProTip>
          </Section>

          {/* Photos */}
          <Section id="photos" title="Photos">
            <ul className={ul}>
              <li>
                Upload the <strong>original</strong> photo from the camera or
                photographer. Never a screenshot, never one saved off Facebook.
              </li>
              <li>
                <strong>Bigger is better</strong>: at least 1400px wide. The
                Studio warns you if a photo is too small, and refuses truly
                tiny ones.
              </li>
              <li>
                Every photo needs <strong>alt text</strong>: one short sentence
                saying what’s in the picture. It’s read aloud to blind
                visitors and read by Google.
              </li>
              <li>
                To choose which part of a photo matters, click the{" "}
                <strong>crop icon</strong> on it and drag the circle. The site
                keeps that part on every screen size.
              </li>
            </ul>
          </Section>

          {/* Help */}
          <Section id="help" title="Help">
            <ul className={ul}>
              <li>
                <strong>Red dot on Publish?</strong> A required field is empty.
                Scroll up; it’s outlined in red.
              </li>
              <li>
                <strong>Orange warning?</strong> Just advice. Read it, then
                publish anyway if it doesn’t apply.
              </li>
              <li>
                <strong>Something missing from the site?</strong> It’s almost
                always empty content, because empty sections hide themselves.
                Fill the fields in and it comes back.
              </li>
              <li>
                <strong>Can’t sign in?</strong> Use the same method as the
                first time (same Google account), or ask your developer to
                re-send the invitation.
              </li>
            </ul>
            <Warning>
              Take a screenshot and send it to your developer. Don’t delete
              things to try to fix it: edits are always recoverable, a
              deletion may not be.
            </Warning>
          </Section>
        </main>
      </div>
    </>
  );
}
