import deepmerge from "deepmerge";
import { theme } from "@primer/react";
import { AXON_TOKENS } from "./tokens";

export const AXON_THEME = deepmerge(theme, {
  fonts: {
    normal: "IBM Plex Sans",
    mono: "IBM Plex Mono",
  },
  fontSizes: {
    0: "12px",
    1: "14px",
    2: "16px",
    3: "20px",
    4: "24px",
    5: "32px",
    6: "40px",
    7: "48px",
    8: "56px",
  },
  colorSchemes: {
    light: {
      colors: {
        header: {
          text: AXON_TOKENS.black100,
          bg: AXON_TOKENS.white100,
          divider: "#eaecef",
          logo: "#000000",
        },
      },
    },
    dark: {
      colors: {
        bg: {
          default: AXON_TOKENS.black100,
          defaulta: AXON_TOKENS.black100a,
          variant1: AXON_TOKENS.black90,
          variant1a: AXON_TOKENS.black90a,
          variant2: AXON_TOKENS.black80,
          variant2b: AXON_TOKENS.black85,
          variant2c: AXON_TOKENS.black85b,
          variant3: AXON_TOKENS.black70,
        },
        fg: {
          default: AXON_TOKENS.white100,
          variant1: AXON_TOKENS.white90,
          variant2: AXON_TOKENS.white80,
          variant3: AXON_TOKENS.white70,
          // defaut: "orange",
          muted: AXON_TOKENS.white70,
          subtle: "yellow",
          emphasis: "green",
        },
        primary: {
          default: AXON_TOKENS.primary100,
          variant1: AXON_TOKENS.primary100a,
        },
        success: {
          default: AXON_TOKENS.green100,
        },
        danger: {
          default: AXON_TOKENS.red100,
        },
        warning: {
          default: AXON_TOKENS.yellow100,
        },
        border: {
          default: AXON_TOKENS.black90,
          variant1: AXON_TOKENS.black80,
          variant2: AXON_TOKENS.white80,
        },
        text: {
          primary: AXON_TOKENS.primary100,
          black: AXON_TOKENS.black100,
          white: AXON_TOKENS.white100,
          gray: AXON_TOKENS.white70,
          grayLight: AXON_TOKENS.white80,
        },
        header: {
          text: AXON_TOKENS.white100,
          bg: AXON_TOKENS.black100,
          divider: AXON_TOKENS.black90,
          logo: "#ffffff",
        },
        overlay: {
          backdrop: "red",
        },
        primer: {
          fg: {
            disabled: AXON_TOKENS.black80,
          },
          canvas: {
            backdrop: AXON_TOKENS.black100a,
            sticky: "red",
          },
        },
        btn: {
          text: AXON_TOKENS.white100,
          bg: AXON_TOKENS.black90,
          border: AXON_TOKENS.black90,
          hoverBg: AXON_TOKENS.black80,
          hoverBorder: AXON_TOKENS.black80,
          activeBg: AXON_TOKENS.black80,
          activeBorder: AXON_TOKENS.black80,
          selectedBg: AXON_TOKENS.black80,
          counterBg: AXON_TOKENS.black80,
          primary: {
            text: AXON_TOKENS.white100,
            bg: AXON_TOKENS.primary100,
            border: AXON_TOKENS.primary100,
            hoverBg: AXON_TOKENS.primary90,
            hoverBorder: AXON_TOKENS.primary90,
            activeBg: AXON_TOKENS.primary90,
            activeBorder: AXON_TOKENS.primary90,
            selectedBg: AXON_TOKENS.primary90,
            counterBg: AXON_TOKENS.primary90,
            disabledBg: AXON_TOKENS.primary100a,
            disabledBorder: AXON_TOKENS.primary100a,
          },
          danger: {
            text: AXON_TOKENS.red100,
            bg: AXON_TOKENS.red100,
            border: AXON_TOKENS.red100,
            hoverBg: AXON_TOKENS.red100,
            hoverBorder: AXON_TOKENS.red100,
            activeBg: AXON_TOKENS.red100,
            activeBorder: AXON_TOKENS.red100,
            selectedBg: AXON_TOKENS.red100,
            counterBg: AXON_TOKENS.red100,
          },
          inactive: {
            bg: AXON_TOKENS.black80,
          },
        },
        accent: {
          fg: AXON_TOKENS.primary100,
          emphasis: AXON_TOKENS.primary100,
          muted: AXON_TOKENS.white80,
          subtle: "yellow",
        },
        project: {
          headerBg: "green",
          sidebarBg: "red",
        },
        ansi: {
          black: AXON_TOKENS.primary100,
          red: AXON_TOKENS.primary100,
        },
        canvas: {
          default: AXON_TOKENS.black100,
          overlay: AXON_TOKENS.black100,
          inset: AXON_TOKENS.primary100,
          subtle: AXON_TOKENS.black100,
        },
        actionListItem: {
          inlineDivider: AXON_TOKENS.black80,
          default: {
            hoverBg: AXON_TOKENS.black90,
            hoverBorder: AXON_TOKENS.black85,
            activeBg: AXON_TOKENS.black85,
            activeBorder: AXON_TOKENS.black85,
            selectedBg: AXON_TOKENS.transparent,
          },
          danger: {
            hoverBg: AXON_TOKENS.red100,
            activeBg: "red",
            hoverText: AXON_TOKENS.white100,
          },
        },

        checks: {
          bg: "red",
          textLink: "green",
        },

        treeViewItem: {
          directory: {
            fill: AXON_TOKENS.primary100,
          },
          chevron: {
            hoverBg: AXON_TOKENS.transparent,
          },
        },
        switchTrack: {
          bg: AXON_TOKENS.black85,
          hoverBg: AXON_TOKENS.black85b,
          activeBg: AXON_TOKENS.black85b,
          disabledBg: AXON_TOKENS.black85,
          fg: AXON_TOKENS.primary100,
          disabledfg: "blue",
          border: AXON_TOKENS.transparent,
          checked: {
            bg: AXON_TOKENS.primary100,
            hoverBg: AXON_TOKENS.primary90,
            activeBg: AXON_TOKENS.primary100,
            border: AXON_TOKENS.transparent,
            fg: AXON_TOKENS.black80,
            disabledfg: AXON_TOKENS.black80,
          },
        },
        switchKnob: {
          bg: AXON_TOKENS.black80,
          border: AXON_TOKENS.transparent,
          diabledBg: AXON_TOKENS.black80,
          checked: {
            bg: AXON_TOKENS.black80,
            disabledBg: "orange",
            border: AXON_TOKENS.transparent,
          },
        },
      },
      shadows: {
        overlay: {
          shadow: `0 0 0 0px, 0 0px 0px ${AXON_TOKENS.primary100}`,
          // shadow: "0 0 0 1px #30363d, 0 16px 32px red",
        },
        shadow: {
          small: "0 0 red",
          medium: `0 3px 6px ${AXON_TOKENS.black85b}`,
          large: "0 0px 0px green",
          extraLarge: "0 12px 48px yellow",
        },
      },
    },
  },
});
