import { defineCollection } from "astro:content";
// `z` re-exported from `astro:content` is deprecated; import it from
// `astro/zod` (the pattern nimbus-docs' own schema helpers document).
import { z } from "astro/zod";
import { docsCollection, partialsCollection } from "@cloudflare/nimbus-docs/content";

export const collections = {
  docs: defineCollection(
    docsCollection({
      schemaFields: {
        // Nimbus docs are agent-friendly by default. Set `audience: human`
        // to flag a page that's written primarily for human readers.
        audience: z.literal("human").optional(),
      },
    }),
  ),
  partials: defineCollection(partialsCollection()),
  posts: defineCollection(
    docsCollection({
      base: "posts",
      schemaFields: {
        audience: z.literal("human").optional(),
        publishedAt: z.coerce.date(),
      },
    }),
  ),
  notes: defineCollection(
    docsCollection({
      base: "notes",
      schemaFields: {
        audience: z.literal("human").optional(),
        publishedAt: z.coerce.date(),
      },
    }),
  ),
};
