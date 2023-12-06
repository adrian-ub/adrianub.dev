import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import { remarkReadingTime } from "./plugins/reading-time";
import theme from "./theme/moonlight-ii.json?raw";

import critters from "astro-critters";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: true,
  theme: JSON.parse(theme),
};

// https://astro.build/config
export default defineConfig({
  site: "https://adrianub.dev",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [rehypePrettyCode, options],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
          content: {
            type: "text",
            value: "↗",
          },
        },
      ],
    ],
  },
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    partytown(),
    critters(),
  ],
});
