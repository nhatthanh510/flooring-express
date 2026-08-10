// Run ONCE, AFTER deploying the unified-gallery code:
//
//   node --env-file=.env scripts/finalize-unified-gallery.mjs
//
// The unified model stores a project's detail page on the project document
// itself; the standalone caseStudy documents and the demo types only survive
// so the PREVIOUS deploy keeps rendering until the new one is live. Running
// this before that deploy would break production detail pages (old code reads
// the caseStudy documents this deletes) and leak the demo tiles (old queries
// have no hidden filter).
//
// What it does:
//  1. Converts the demo documents to plain galleryProject with
//     "Hide from website" ON — so they sit in the normal Studio list and the
//     toggle alone controls their visibility from then on.
//  2. Removes the legacy caseStudy references from the real projects.
//  3. Deletes every standalone caseStudy / demo-type document.
// A browser tab is held open on the live site so production revalidates.
import { chromium } from "playwright";
import { createClient } from "@sanity/client";

const SITE = "https://www.flooringexpress.com.au";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Refuse to run against the old deploy: the unified code links gallery tiles
// to their own slug, which the old build never did for the video tile.
const probe = await fetch(`${SITE}/gallery/blackbutt-cottage-renovation`).then((r) => r.text());
if (!probe.includes("Bringing a Cottage Back")) {
  console.error(
    "The live site does not look like the unified build yet (detail page is not " +
      "rendering from the project document). Deploy first, then re-run.",
  );
  process.exit(1);
}

const b = await chromium.launch();
const page = await b.newPage();
await page.goto(`${SITE}/gallery`, { waitUntil: "load" });
await page.waitForTimeout(2500);

const demos = await c.fetch(`*[_type == "demoGalleryProject"]`);
const realProjects = await c.fetch(`*[_type == "galleryProject" && defined(caseStudy)]._id`);
const legacyCases = await c.fetch(`*[_type in ["caseStudy", "demoCaseStudy"]]._id`);

const tx = c.transaction();
for (const doc of demos) {
  const { _rev, _createdAt, _updatedAt, caseStudy, ...rest } = doc;
  void _rev; void _createdAt; void _updatedAt; void caseStudy;
  tx.createOrReplace({ ...rest, _type: "galleryProject", hidden: true });
}
for (const id of realProjects) tx.patch(id, (p) => p.unset(["caseStudy"]));
for (const id of legacyCases) tx.delete(id);
await tx.commit();

console.log(
  `converted ${demos.length} demo docs to hidden gallery projects, ` +
    `cleaned ${realProjects.length} legacy references, deleted ${legacyCases.length} legacy documents`,
);
await page.waitForTimeout(9000);
await b.close();
console.log("Done. Ask Claude to strip the legacy caseStudy/demo schema types next.");
