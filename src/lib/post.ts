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

export const getRelatedPosts = (currentSlug: string, currentCats: any[]) => {
  const relatedPostCount = 3;
  const relatedPosts = posts.filter(
    (post) =>
      post.slug !== currentSlug &&
      post.data.categories?.some((category) =>
        currentCats.some((cat) => cat.slug === category.slug)
      )
  );

  const slicedRelatedPosts = relatedPosts.slice(0, relatedPostCount);

  if (slicedRelatedPosts.length === relatedPostCount) {
    return slicedRelatedPosts;
  }

  const remainingPosts = posts.filter(
    (post) =>
      post.slug !== currentSlug &&
      !slicedRelatedPosts.some((relatedPost) => relatedPost.slug === post.slug)
  );

  return slicedRelatedPosts.concat(
    remainingPosts.slice(0, relatedPostCount - slicedRelatedPosts.length)
  );
};
