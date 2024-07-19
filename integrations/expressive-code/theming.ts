import { ExpressiveCodeTheme } from "astro-expressive-code";

export function applyUiThemeColors(theme: ExpressiveCodeTheme) {
  const isDark = theme.type === "dark";
  const neutralMinimal = isDark ? "#ffffff17" : "#0000001a";
  const neutralDimmed = isDark ? "#ffffff40" : "#00000055";

  // Make borders slightly transparent
  const borderColor = `color-mix(in srgb, ${
    isDark ? "hsl(224, 10%, 23%)" : "hsl(224, 6%, 77%)"
  }, transparent 25%)`;
  theme.colors["titleBar.border"] = borderColor;
  theme.colors["editorGroupHeader.tabsBorder"] = borderColor;

  // Use the same color for terminal title bar background and editor tab bar background
  const backgroundColor = isDark ? "hsl(224, 10%, 10%)" : "hsl(224, 20%, 94%)";
  theme.colors["titleBar.activeBackground"] = backgroundColor;
  theme.colors["editorGroupHeader.tabsBackground"] = backgroundColor;

  // Use the same color for terminal titles and tab titles
  theme.colors["titleBar.activeForeground"] = isDark
    ? "hsl(224, 6%, 77%)"
    : "hsl(224, 10%, 23%)";
  theme.colors["tab.activeForeground"] = isDark
    ? "hsl(224, 6%, 77%)"
    : "hsl(224, 10%, 23%)";

  // Set tab border colors
  const activeBorderColor = isDark
    ? "hsl(224, 100%, 85%)"
    : "hsl(234, 90%, 60%)";
  theme.colors["tab.activeBorder"] = "transparent";
  theme.colors["tab.activeBorderTop"] = activeBorderColor;

  // Use neutral colors for scrollbars
  theme.colors["scrollbarSlider.background"] = neutralMinimal;
  theme.colors["scrollbarSlider.hoverBackground"] = neutralDimmed;

  // Set theme `bg` color property for contrast calculations
  theme.bg = isDark ? "#23262f" : "#f6f7f9";

  const editorBackgroundColor = isDark
    ? "hsl(224, 14%, 16%)"
    : "hsl(224, 19%, 97%)";

  theme.styleOverrides.frames = {
    // Use the same color for editor background, terminal background and active tab background
    editorBackground: editorBackgroundColor,
    terminalBackground: editorBackgroundColor,
    editorActiveTabBackground: editorBackgroundColor,
    terminalTitlebarDotsForeground: borderColor,
    terminalTitlebarDotsOpacity: "0.75",
    inlineButtonForeground: isDark ? "hsl(224, 6%, 77%)" : "hsl(224, 10%, 23%)",
    frameBoxShadowCssValue: "none",
  };

  // Use neutral, semi-transparent colors for default text markers
  // to avoid conflicts with the user's chosen background color
  theme.styleOverrides.textMarkers = {
    markBackground: neutralMinimal,
    markBorderColor: neutralDimmed,
  };

  return theme;
}
