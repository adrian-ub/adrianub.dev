import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { getPostsFromSerie } from "./post";

export const series = await getCollection("series");

export const staticPaths = (() => {
  return series.map((serie) => ({
    params: { slug: serie.slug },
    props: { ...serie, posts: getPostsFromSerie(serie.slug) },
  }));
}) satisfies GetStaticPaths;
