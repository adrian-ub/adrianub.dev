import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";

import rehypeExternalLinks from "rehype-external-links";
import critters from "astro-critters";
import icon from "astro-icon";

import { remarkReadingTime } from "./plugins/reading-time";

import { pageFind } from "./integrations/pagefind";
import { expressiveCode } from "./integrations/expressive-code";

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
            value: " ↗",
          },
        },
      ],
    ],
  },
  integrations: [
    icon(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    expressiveCode(),
    mdx(),
    partytown(),
    pageFind(),
    critters(),
  ],
});
