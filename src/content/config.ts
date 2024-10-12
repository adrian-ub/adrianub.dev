import { defineCollection } from 'astro:content'
import { pagesSchema } from 'astro-vitesse/schema'

export const collections = {
  pages: defineCollection({
    schema: pagesSchema(),
  }),
}
