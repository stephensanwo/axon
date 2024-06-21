import { editor } from "monaco-editor";
import { Theme } from "src/types/theme";

export function getCustomEditorTheme(theme: Theme) {
  return {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.background": theme?.colors.bg.default,
      "editorStickScrollbar.background": theme?.colors.bg.default,
      "breadcrumb.background": theme?.colors.bg.default,
      "editorGutter.background": theme?.colors.bg.default,
      "editorMarkerNavigation.background": theme?.colors.bg.default,

      // Input
      "input.background": theme?.colors.bg.default,
      "input.foreground": theme?.colors.text.grayLight,
      "inputOption.activeBorder": theme?.colors.primary.default,
      "inputOption.hoverBackground": theme?.colors.primary.variant1,

      // List
      "list.activeSelectionBackground": theme?.colors.primary.variant1,

      "dropdown.background": theme?.colors.bg.default,
      "dropdown.border": theme?.colors.bg.default,
      "checkbox.background": theme?.colors.bg.default,
      "checkbox.border": theme?.colors.bg.default,
      "menu.background": theme?.colors.bg.default,

      "menu.selectionBackground": theme?.colors.primary.variant1,

      // Scrollbar
      "scrollbar.shadow": theme?.colors.bg.default,
      "scrollbarSlider.activeBackground": theme?.colors.bg.variant2,
      "scrollbarSlider.background": theme?.colors.bg.default,
      "scrollbarSlider.hoverBackground": theme?.colors.bg.variant2,
    },
    encodedTokensColors: [],
    rules: [],
  } satisfies editor.IStandaloneThemeData;
}
