export const StateColors = {
  open: "#1192e8",
  success: "#42be65",
  failed: "#fa4d56",
  neutral: "#fff",
  warning: "#f1c21b",
  running: "#393939",
};
export const ThemeColors = {
  bgDark: "#161616",
  bgDark2: "#262626",
  // bgDark: "rgba(0, 0, 0, 0.93)"
  bgLight: "#ffffff",
  white: "#ffffff",
  bgPrimary: "#f4f4f4",
  bgSecondary: "rgb(27, 27, 27)",
  primaryAction: "#d3ec45",
  dangerAction: "#d92f37",
  bgHiglight1: "#202020",
  bgHighlight2: "rgb(43, 43, 43)",
  textDark: "#6f6f6f",
  primary: "#DAEF68",
  primaryHover: "#d3ec45",
  textBlack: "#000",
  accent: "#1688d4",
  border: "#393939",
};

export const NodeThemes = {
  green: "rgb(102, 209, 158)",
  blue: "#b8dcf5",
  pink: "#ffdbdb",
  yellow: "#ffe7a9",
  white: "#ffffff",
  black: "#000000",
};

export enum ColorTypes {
  GREEN1 = "GREEN1",
  GREEN2 = "GREEN2",
  RED1 = "RED1",
  RED2 = "RED2",
  GREY1 = "GREY1",
  YELLOW1 = "YELLOW1",
  YELLOW2 = "YELLOW2",
  YELLOW3 = "YELLOW3",
  ORANGE1 = "ORANGE1",
  PINK1 = "PINK1",
  PURPLE1 = "PURPLE1",
  BLUE1 = "BLUE1",
  BLUE2 = "BLUE2",
  GREENNEON = "GREENNEON",
  YELLOWNEON = "YELLOWNEON",
}

export type IColorPalette = Record<
  ColorTypes,
  {
    label: string;
    hex: string;
  }
>;

export const ColorPalette: IColorPalette = {
  GREEN1: {
    label: "Green 1",
    hex: "#b6d9bb",
  },
  GREEN2: {
    label: "Green 2",
    hex: "#b6d9bb",
  },
  RED1: {
    label: "Red 1",
    hex: "#b6d9bb",
  },
  RED2: {
    label: "Red 2",
    hex: "#b6d9bb",
  },
  GREY1: {
    label: "Grey 1",
    hex: "#EDEDED",
  },
  YELLOW1: {
    label: "Yellow 1",
    hex: "#FFE9AE",
  },
  YELLOW2: {
    label: "Yellow 2",
    hex: "#E2DE88",
  },
  YELLOW3: {
    label: "Yellow 3",
    hex: "#E4DD5E",
  },
  ORANGE1: {
    label: "Orange 1",
    hex: "#F7AE94",
  },
  PINK1: {
    label: "Pink 1",
    hex: "#ED94BD",
  },
  PURPLE1: {
    label: "Purple 1",
    hex: "#D48BE5",
  },
  BLUE1: {
    label: "Blue 1",
    hex: "#B3CADE",
  },
  BLUE2: {
    label: "Blue 2",
    hex: "#5FC0CA",
  },
  GREENNEON: {
    label: "Green Neon",
    hex: "#A6FF00",
  },
  YELLOWNEON: {
    label: "Yellow Neon",
    hex: "#F6FF01",
  },
};
