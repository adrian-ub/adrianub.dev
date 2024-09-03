import { defineCollection, z } from "astro:content";

const pages = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z
            .object({
                src: z.string(),
                alt: z.string(),
            })
            .optional(),
    }),
});

const posts = defineCollection({
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z
                .string()
                .or(z.date())
                .transform((val: string | number | Date) => new Date(val)),
            draft: z.boolean().default(false).optional(),
            redirect: z.string().optional(),
            video: z.boolean().default(false).optional()
        }),
});

export const collections = { pages, posts };
