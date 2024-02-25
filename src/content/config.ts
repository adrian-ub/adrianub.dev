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
      heroImage: image().optional(),
      categories: z.array(reference("tags")).optional(),
      featured: z.boolean().optional().default(false),
      tableOfContents: z.boolean().optional().default(true),
      serie: reference("series").optional(),
      author: reference("authors").default("adrianub"),
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

const authors = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      picture: image().optional(),
      social: z.object({
        x: z.string().url(),
        github: z.string().url(),
        linkedin: z.string().url(),
      }),
    }),
});

export const collections = { blog, tags, pages, series, authors };
