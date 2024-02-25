import { readingTime } from "reading-time-estimator";
import { toText } from "hast-util-to-text";
import type { Root } from "hast";

export function rehypeReadingTime() {
  return function (tree: Root, { data }: any) {
    const textOnPage = toText(tree);
    const time = readingTime(textOnPage, undefined, "es");
    data.astro.frontmatter.minutesRead = time.text;
  };
}
