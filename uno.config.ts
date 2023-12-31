import { defineConfig, presetUno, presetTypography } from "unocss";

import transformerCompileClass from "@unocss/transformer-compile-class";

import extractorMdc from "@unocss/extractor-mdc";
import extractorArbitrary from "@unocss/extractor-arbitrary-variants";

import presetAnimations from "unocss-preset-animations";

const linkHeadingStyles = {
  color: "#f3f4f6",
  borderBottomColor: "transparent",
};

const linkHeadingStylesHover = {
  color: `#111827`,
};

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
      variablePrefix: "ub-",
    }),
    presetAnimations(),
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
          "border-bottom": `2px solid #155e75`,
          color: "#22d3ee",
          transition:
            "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
        },
        "a:hover": {
          color: `#18181b !important`,
          "border-bottom-color": `#a5f3fc !important`,
          background: "#a5f3fc",
        },
      },
    }),
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: "calc(var(--radius) - 4px)",
    },
    fontFamily: {
      sans: "var(--font-sans)",
      heading: "var(--font-heading)",
    },
  },
  transformers: [
    transformerCompileClass({
      classPrefix: "",
    }),
  ],
  extractors: [extractorMdc(), extractorArbitrary],
});
