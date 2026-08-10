import type { StructureResolver } from "sanity/structure";

import { singletonNames } from "@/sanity/schemaTypes/singletons";

/**
 * Singletons are pinned as a single editable document rather than a list, so
 * there is no "create another Home page" button and their ids stay stable —
 * queries fetch them by a fixed id, and the migration script writes to the same.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              singletonNames
                .filter((name) => name !== "siteSettings")
                .map((name) =>
                  S.listItem()
                    .title(
                      // "aboutPage" -> "About page"
                      name
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (c) => c.toUpperCase()),
                    )
                    .id(name)
                    .child(S.document().schemaType(name).documentId(name)),
                ),
            ),
        ),

      S.divider(),

      S.documentTypeListItem("flooringService").title("Flooring services"),
      S.documentTypeListItem("galleryProject").title("Gallery projects"),

      S.divider(),

      S.documentTypeListItem("faqGroup").title("FAQ categories"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("processStep").title("Process steps"),
    ]);
