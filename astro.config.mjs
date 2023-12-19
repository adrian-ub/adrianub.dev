import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import { remarkReadingTime } from "./plugins/reading-time";

import critters from "astro-critters";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://adrianub.dev",
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
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
    expressiveCode({
      defaultLocale: "es",
    }),
    mdx(),
    partytown(),
    critters(),
  ],
});
