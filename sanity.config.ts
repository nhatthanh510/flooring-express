import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { singletonNames } from "@/sanity/schemaTypes/singletons";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    /**
     * Strip "create" and "delete" from the singletons so an editor can't end up
     * with two Home pages, or none. The desk structure already routes to a
     * fixed document id; this closes the other doors into the same types.
     */
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonNames.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonNames.includes(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    /**
     * Click-to-edit previewing of the real site. `enable` points at the route
     * handler that turns on Next's draft mode; from there `defineLive` serves
     * drafts and stega-tagged strings so the overlays know what to link to.
     */
    presentationTool({
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
