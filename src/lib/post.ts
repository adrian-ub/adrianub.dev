import { getCollection } from "astro:content";

export const posts = (await getCollection("blog")).sort(
  (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
);

export const getPostsFromSerie = (slug: string) => {
  return posts.filter((post) => post.data.serie?.slug === slug);
};

export const getPostsFromCategories = (slug: string) => {
  return posts.filter((post) =>
    post.data.categories?.some((category) => category.slug === slug)
  );
};
