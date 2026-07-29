import type { SchemaTypeDefinition } from "sanity";

import { documentTypes } from "@/sanity/schemaTypes/documents";
import { objectTypes } from "@/sanity/schemaTypes/objects";
import { singletonTypes } from "@/sanity/schemaTypes/singletons";

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectTypes,
  ...documentTypes,
  ...singletonTypes,
];
