import { defineCollection } from 'astro:content'
import { pagesLoader } from 'astro-vitesse/loaders'
import { pagesSchema } from 'astro-vitesse/schema'

export const collections = {
  pages: defineCollection({
    loader: pagesLoader(),
    schema: pagesSchema(),
  }),
}
