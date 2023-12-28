import { fileURLToPath } from "node:url";
import { dirname, relative } from "node:path";
import { spawn } from "node:child_process";

import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";

import rehypeExternalLinks from "rehype-external-links";
import critters from "astro-critters";
import icon from "astro-icon";

import { remarkReadingTime } from "./plugins/reading-time";
import {
  preprocessThemes,
  applyUiThemeColors,
} from "./integrations/expressive-code/theming";
import expressiveCode, {
  pluginFramesTexts,
  addClassName,
} from "astro-expressive-code";
pluginFramesTexts.overrideTexts("es", {
  copyButtonCopied: "¡Copiado!",
  copyButtonTooltip: "Copiar al portapapeles",
  terminalWindowFallbackTitle: "Ventana de terminal",
});
const themes = preprocessThemes();
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
    expressiveCode({
      themes,
      defaultLocale: "es",
      customizeTheme: (theme) => {
        applyUiThemeColors(theme);

        return theme;
      },
      themeCssSelector: (theme, { styleVariants }) => {
        // If one dark and one light theme are available, and the user has not disabled it,
        if (styleVariants.length >= 2) {
          const baseTheme = styleVariants[0]?.theme;
          const altTheme = styleVariants.find(
            (v) => v.theme.type !== baseTheme?.type,
          )?.theme;
          if (theme === baseTheme || theme === altTheme)
            return `[data-theme='${theme.type}']`;
        }
        // Return the default selector
        return `[data-theme='${theme.name}']`;
      },
      plugins: [
        {
          name: "UB Plugin",
          hooks: {
            postprocessRenderedBlock: ({ renderData }) => {
              addClassName(renderData.blockAst, "not-prose");
            },
          },
        },
      ],
      styleOverrides: {
        borderRadius: "0px",
        borderWidth: "1px",
        codePaddingBlock: "0.75rem",
        codePaddingInline: "1rem",
        codeFontSize: "0.875rem",
        codeLineHeight: "1.8",
        textMarkers: {
          lineDiffIndicatorMarginLeft: "0.25rem",
          defaultChroma: "45",
          backgroundOpacity: "60%",
        },
      },
    }),
    mdx(),
    partytown(),
    critters(),
    {
      name: "pagefind",
      hooks: {
        "astro:build:done": ({ dir }) => {
          const targetDir = fileURLToPath(dir);
          const cwd = dirname(fileURLToPath(import.meta.url));
          const relativeDir = relative(cwd, targetDir);
          return new Promise((resolve) => {
            spawn("npx", ["-y", "pagefind", "--site", relativeDir], {
              stdio: "inherit",
              shell: true,
              cwd,
            }).on("close", () => resolve());
          });
        },
      },
    },
  ],
});
