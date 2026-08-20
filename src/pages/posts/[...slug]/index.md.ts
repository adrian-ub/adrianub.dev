/**
 * Per-page /posts/<slug>/index.md — clean markdown alternate for every
 * indexable entry of the `posts` collection.
 */

import { getIndexedEntries, renderEntryAsMarkdown, type IndexedEntry } from "@cloudflare/nimbus-docs";
import { config } from "virtual:nimbus/config";

export const prerender = true;

const COLLECTION = "posts";

interface SlugProps {
  item: IndexedEntry;
}

export async function getStaticPaths() {
  const indexed = await getIndexedEntries();
  return indexed
    .filter((item) => item.collection === COLLECTION)
    .map((item) => ({
      params: { slug: item.entry.id },
      props: { item } as SlugProps,
    }));
}

export async function GET({ props }: { props: SlugProps }) {
  const { item } = props;
  const { entry, title, description, markdownUrl, sourceUrl } = item;
  const data = (entry.data ?? {}) as Record<string, unknown>;
  const rawImage = data.socialImage;
  const socialImage =
    typeof rawImage === "string" && rawImage.length > 0
      ? rawImage
      : config.socialImage;

  const markdown = renderEntryAsMarkdown(entry);

  const body = [
    "---",
    `title: ${JSON.stringify(title)}`,
    ...(description ? [`description: ${JSON.stringify(description)}`] : []),
    ...(socialImage
      ? [`image: ${JSON.stringify(new URL(socialImage, config.site).href)}`]
      : []),
    "---",
    "",
    "> Documentation Index",
    `> Fetch the complete documentation index at: ${new URL("/llms.txt", config.site).href}`,
    "> Use this file to discover all available pages before exploring further.",
    "",
    `# ${title}`,
    "",
    markdown,
    "",
    `Source: ${new URL(sourceUrl ?? markdownUrl, config.site).href}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
