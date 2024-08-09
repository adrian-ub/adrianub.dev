import siteConfig from "@/site-config";
import { getPosts } from "@/utils/posts";
import rss from "@astrojs/rss";

export async function GET(context: { site: string }) {
	const posts = await getPosts();
	return rss({
		title: siteConfig.author,
		description: `${siteConfig.author} Blog`,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/posts/${post.slug}/`,
		})),
	});
}
