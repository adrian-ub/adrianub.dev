import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: image().optional(),
      categories: z.array(reference("tags")).optional(),
      featured: z.boolean().optional().default(false),
      tableOfContents: z.boolean().optional().default(true),
      serie: reference("series").optional(),
    }),
});

const tags = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    posts: z.array(reference("blog")).optional(),
  }),
});

const series = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      heroImage: image().optional(),
      posts: z.array(reference("blog")).optional(),
    }),
});

const pages = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      heroImage: image().optional(),
    }),
});

export const collections = { blog, tags, pages, series };
