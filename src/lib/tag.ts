import { getCollection } from "astro:content";
import { getPostsFromCategories } from "./post";
import type { GetStaticPaths } from "astro";

export const tags = await getCollection("tags");

export const staticPaths = (() => {
  return tags.map((tag) => ({
    params: { slug: tag.slug },
    props: { ...tag, posts: getPostsFromCategories(tag.slug) },
  }));
}) satisfies GetStaticPaths;
