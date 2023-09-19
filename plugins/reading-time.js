import { readingTime } from "reading-time-estimator";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const time = readingTime(textOnPage, undefined, "es");
    data.astro.frontmatter.minutesRead = time.text;
  };
}
