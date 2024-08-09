import type { Root } from "hast";
import { toText } from "hast-util-to-text";
import { readingTime } from "reading-time-estimator";

interface PluginData {
	astro: {
		frontmatter: {
			minutesRead: string;
		};
	};
}

export function rehypeReadingTime() {
	return (tree: Root, { data }: { data: PluginData }) => {
		const textOnPage = toText(tree);
		const time = readingTime(textOnPage, undefined, "es");
		data.astro.frontmatter.minutesRead = time.minutes.toString();
	};
}
