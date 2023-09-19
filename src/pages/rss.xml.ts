import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION, AUTHOR_NAME } from "@/lib/consts";
import { posts } from "../lib/post";

export async function GET(context: APIContext) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map(({ slug, data: { categories, ...rest }, body }) => ({
      ...rest,
      content: sanitizeHtml(parser.render(body)),
      author: AUTHOR_NAME,
      categories: categories?.map(({ collection }) => collection),
      link: `/${slug}/`,
    })),
    customData: `<language>es</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
