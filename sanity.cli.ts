import { defineCliConfig } from "sanity/cli";

/**
 * Used by the `sanity` CLI — chiefly `pnpm typegen`, which extracts the schema
 * and generates `sanity.types.ts` from the `defineQuery` calls in
 * src/sanity/queries.ts.
 *
 * Reads the same env vars as the app rather than hardcoding ids, so a fresh
 * clone with a filled-in .env.local needs no extra setup.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
