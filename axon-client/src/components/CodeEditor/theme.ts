import { editor } from "monaco-editor";
import { ThemeColors } from "src/shared/themes";

export const CustomEditorTheme = {
  base: "vs-dark",
  inherit: true,
  colors: {
    "editor.background": ThemeColors.bgDark,
    "editorStickScrollbar.background": ThemeColors.bgDark,
    "breadcrumb.background": ThemeColors.bgDark,
    "editorGutter.background": ThemeColors.bgDark,
    "editorMarkerNavigation.background": ThemeColors.bgDark,

    "input.background": ThemeColors.bgDark2,
    "dropdown.background": ThemeColors.bgDark2,
    "dropdown.border": ThemeColors.bgDark2,
    "checkbox.background": ThemeColors.bgDark2,
    "checkbox.border": ThemeColors.bgDark2,
    "menu.background": ThemeColors.bgDark2,

    "menu.selectionBackground": ThemeColors.primaryVariant1,

    // Scrollbar
    "scrollbar.shadow": ThemeColors.bgDark2,
    "scrollbarSlider.activeBackground": ThemeColors.bgHighlight2,
    "scrollbarSlider.background": ThemeColors.bgDark2,
    "scrollbarSlider.hoverBackground": ThemeColors.bgHighlight2,
  },
  encodedTokensColors: [],
  rules: [],
} satisfies editor.IStandaloneThemeData;
