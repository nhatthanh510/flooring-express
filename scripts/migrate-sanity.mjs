// Seeds a Sanity dataset with the site's content, so a fresh project renders a
// complete site instead of a page of empty sections.
//
//   pnpm migrate:sanity            import scripts/seed/ into the dataset
//   pnpm migrate:sanity --export   capture the current dataset back into seed/
//
// Reads NEXT_PUBLIC_SANITY_* and SANITY_API_WRITE_TOKEN from .env (the package
// script passes --env-file). The write token needs Editor rights.
//
// Importing is idempotent: documents go in with createOrReplace under their
// original ids — which is what keeps the singletons on the fixed ids that
// queries and structure.ts look them up by — and assets are content-addressed
// by Sanity, so re-running re-uses them rather than piling up duplicates.
import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const SEED_DIR = path.join(process.cwd(), "scripts", "seed");
const DOCS = path.join(SEED_DIR, "documents.ndjson");
const ASSETS = path.join(SEED_DIR, "assets.ndjson");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-29",
  token,
  useCdn: false,
  // "raw", not the default "published": the demo reference documents live as
  // drafts, and the published perspective silently filters them out of the
  // export no matter what the GROQ asks for.
  perspective: "raw",
});

const readNdjson = (file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));

/** Sanity's own bookkeeping documents — not content, and not ours to write. */
const isSystem = (type) => type?.startsWith("system.") || type?.startsWith("sanity.");

async function exportDataset() {
  // Drafts are included deliberately: the demo reference documents live as
  // drafts (visible in the Studio, never rendered on the site), and a seed
  // that dropped them would silently lose them on the next import.
  const docs = await client.fetch(
    `*[!(_type match "sanity.*") && !(_type match "system.*")] | order(_type asc, _id asc)`,
  );
  const assets = await client.fetch(
    `*[_type match "sanity.*Asset"]{ _id, _type, originalFilename, url, mimeType }`,
  );

  mkdirSync(SEED_DIR, { recursive: true });
  writeFileSync(DOCS, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
  writeFileSync(ASSETS, assets.map((a) => JSON.stringify(a)).join("\n") + "\n");

  console.log(`exported ${docs.length} documents and ${assets.length} assets to scripts/seed/`);
}

/**
 * Re-uploads every asset the seed refers to and returns old id → new id.
 *
 * Assets cannot be created by id, so a fresh project mints its own. Documents
 * therefore have to be rewritten before they are written (see `remapRefs`), or
 * every image on the site resolves to nothing.
 */
async function uploadAssets(assets) {
  const map = new Map();
  const existing = new Set(
    await client.fetch(`*[_type match "sanity.*Asset"]._id`),
  );

  for (const [index, asset] of assets.entries()) {
    const label = `[${index + 1}/${assets.length}] ${asset.originalFilename ?? asset._id}`;

    // Same project: the id is already there, so skip the download entirely.
    if (existing.has(asset._id)) {
      map.set(asset._id, asset._id);
      console.log(`  ${label} — already present`);
      continue;
    }

    const response = await fetch(asset.url);
    if (!response.ok) {
      throw new Error(`Could not download ${asset.url} (${response.status})`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());

    const uploaded = await client.assets.upload(
      asset._type === "sanity.fileAsset" ? "file" : "image",
      buffer,
      { filename: asset.originalFilename, contentType: asset.mimeType },
    );

    map.set(asset._id, uploaded._id);
    console.log(`  ${label} — uploaded as ${uploaded._id}`);
  }

  return map;
}

/** Rewrites every `_ref` that points at a remapped asset, at any depth. */
function remapRefs(value, map) {
  if (Array.isArray(value)) return value.map((item) => remapRefs(item, map));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, inner]) => [
        key,
        key === "_ref" && typeof inner === "string" && map.has(inner)
          ? map.get(inner)
          : remapRefs(inner, map),
      ]),
    );
  }
  return value;
}

async function importDataset() {
  const docs = readNdjson(DOCS).filter((d) => !isSystem(d._type));
  const assets = readNdjson(ASSETS);

  console.log(`uploading ${assets.length} assets…`);
  const map = await uploadAssets(assets);

  console.log(`writing ${docs.length} documents…`);
  // One transaction so a failure part-way cannot leave the dataset with, say,
  // gallery projects whose case-study references point at nothing.
  const tx = client.transaction();
  for (const doc of docs) {
    // Strip the server-managed fields; Sanity rejects or ignores them on write.
    const rest = Object.fromEntries(
      Object.entries(doc).filter(
        ([key]) => !["_rev", "_createdAt", "_updatedAt"].includes(key),
      ),
    );
    tx.createOrReplace(remapRefs(rest, map));
  }
  await tx.commit();

  const byType = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
  console.log("done:", Object.entries(byType).map(([t, n]) => `${t}×${n}`).join(", "));
}

if (process.argv.includes("--export")) {
  await exportDataset();
} else {
  await importDataset();
}
