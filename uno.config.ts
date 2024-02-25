import { defineConfig, presetUno, presetTypography } from "unocss";
import extractorArbitrary from "@unocss/extractor-arbitrary-variants";
import presetAnimations from "unocss-preset-animations";
import { presetUI } from "./preset.ui";

const linkHeadingStyles = {
  color: "#f3f4f6",
  borderBottomColor: "transparent",
};

const linkHeadingStylesHover = {
  color: `#111827`,
};

export default defineConfig({
  content: {
    pipeline: {
      include: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
    },
  },
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetAnimations(),
    presetUI(),
    presetTypography({
      cssExtend: {
        "h2 a": linkHeadingStyles,
        "h3 a": linkHeadingStyles,
        "h4 a": linkHeadingStyles,
        "h5 a": linkHeadingStyles,
        "h6 a": linkHeadingStyles,
        "h2 a:hover": linkHeadingStylesHover,
        "h3 a:hover": linkHeadingStylesHover,
        "h4 a:hover": linkHeadingStylesHover,
        "h5 a:hover": linkHeadingStylesHover,
        "h6 a:hover": linkHeadingStylesHover,
        blockquote: {
          "font-size": "90%",
          color: "#71717a",
          "border-left-color": "#3f3f46",
        },
        "blockquote > p::before": { display: "none" },
        "blockquote > p::after": { display: "none" },
        a: {
          "text-decoration": "none",
        },
        "a:hover": {
          "text-decoration": "underline",
        },
      },
    }),
  ],
  extractors: [extractorArbitrary],
  shortcuts: [
    {
      "flex-center": "flex justify-center items-center",
      "flex-col-center": "flex flex-col justify-center items-center",
    },
  ],
  rules: [
    [
      "hero-gradient",
      { background: "radial-gradient(#ffffff04 50%, transparent 70%)" },
    ],
  ],
  preflights: [
    {
      getCSS: () => `
      :root {
        --color-note: #2f81f7;
        --color-tip: #3fb950;
        --color-warning: #d29922;
        --color-severe: #db6d28;
        --color-caution: #f85149;
        --color-important: #a371f7;
      }

      :root [data-theme="light"] {
        --color-note: #0969da;
        --color-tip: #1a7f37;
        --color-warning: #9a6700;
        --color-severe: #bc4c00;
        --color-caution: #d1242f;
        --color-important: #8250df;
      }

      .markdown-alert {
        padding: 0.5rem 1rem;
        margin-bottom: 16px;
        color: inherit;
        border-left: 0.25em solid #888;
      }

      .markdown-alert > :first-child {
        margin-top: 0;
      }

      .markdown-alert > :last-child {
        margin-bottom: 0;
      }

      .markdown-alert .markdown-alert-title {
        display: flex;
        font-weight: 500;
        align-items: center;
        line-height: 1;
      }

      .markdown-alert .markdown-alert-title .octicon {
        margin-right: 0.5rem;
        display: inline-block;
        overflow: visible !important;
        vertical-align: text-bottom;
        fill: currentColor;
      }

      .markdown-alert.markdown-alert-note {
        border-left-color: var(--color-note);
      }

      .markdown-alert.markdown-alert-note .markdown-alert-title {
        color: var(--color-note);
      }

      .markdown-alert.markdown-alert-important {
        border-left-color: var(--color-important);
      }

      .markdown-alert.markdown-alert-important .markdown-alert-title {
        color: var(--color-important);
      }

      .markdown-alert.markdown-alert-warning {
        border-left-color: var(--color-warning);
      }

      .markdown-alert.markdown-alert-warning .markdown-alert-title {
        color: var(--color-warning);
      }

      .markdown-alert.markdown-alert-tip {
        border-left-color: var(--color-tip);
      }

      .markdown-alert.markdown-alert-tip .markdown-alert-title {
        color: var(--color-tip);
      }

      .markdown-alert.markdown-alert-caution {
        border-left-color: var(--color-caution);
      }

      .markdown-alert.markdown-alert-caution .markdown-alert-title {
        color: var(--color-caution);
      }

      .expressive-code {
        @media (min-width: 1280px) {
          margin-left: -3rem;
          margin-right: -3rem;
        }
      }

      .container {
        @media (max-width: 640px) {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }

      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }
      [data-theme="light"]::view-transition-old(root) {
        z-index: 1;
      }
      [data-theme="light"]::view-transition-new(root) {
        z-index: 2147483646;
      }
      ::view-transition-old(root) {
        z-index: 2147483646;
      }
      ::view-transition-new(root) {
        z-index: 1;
      }
      `,
    },
  ],
});
