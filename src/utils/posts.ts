import { type CollectionEntry, getCollection } from "astro:content";

export function sortPostsByDate(
	itemA: CollectionEntry<"posts">,
	itemB: CollectionEntry<"posts">,
) {
	return (
		new Date(itemB.data.date).getTime() - new Date(itemA.data.date).getTime()
	);
}

export async function getPosts() {
	return (
		await getCollection("posts", (post) => {
			return import.meta.env.PROD ? post.data.draft !== true : true;
		})
	).sort(sortPostsByDate);
}
