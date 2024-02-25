import astroExpressiveCode, {
  pluginFramesTexts,
  addClassName,
} from "astro-expressive-code";
import { applyUiThemeColors } from "./theming";
import type { AstroIntegration } from "astro";

pluginFramesTexts.overrideTexts("es", {
  copyButtonCopied: "¡Copiado!",
  copyButtonTooltip: "Copiar al portapapeles",
  terminalWindowFallbackTitle: "Ventana de terminal",
});

export function expressiveCode(): AstroIntegration {
  return astroExpressiveCode({
    themes: ["github-dark", "github-light"],
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
          (v) => v.theme.type !== baseTheme?.type
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
  });
}
