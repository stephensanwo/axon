import { NodeStyle } from "./node.entity";

export const defaultNodeStyles: NodeStyle = {
  font_weight: {
    value: 400,
    label: "Font Weight",
    component: "number",
  },
  font_alignment: {
    value: "left",
    label: "Font Alignment",
    component: "select",
  },
  font_color: {
    value: {
      value: {
        hex: "#0064b7",
        rgb: {
          r: 0,
          g: 100,
          b: 183,
          a: 1,
        },
        hsv: {
          h: 207.21311475409837,
          s: 100,
          v: 71.76470588235294,
          a: 1,
        },
      },
      label: "Default Font Color",
      view: "hex",
    },
    label: "Font Color",
    component: "color",
  },
  background_color: {
    value: {
      value: {
        hex: "#0064b7",
        rgb: {
          r: 0,
          g: 100,
          b: 183,
          a: 1,
        },
        hsv: {
          h: 207.21311475409837,
          s: 100,
          v: 71.76470588235294,
          a: 1,
        },
      },
      label: "Default Background Color",
      view: "hex",
    },
    label: "Background Color",
    component: "color",
  },
  border_color: {
    value: {
      value: {
        hex: "#0064b7",
        rgb: {
          r: 0,
          g: 100,
          b: 183,
          a: 1,
        },
        hsv: {
          h: 207.21311475409837,
          s: 100,
          v: 71.76470588235294,
          a: 1,
        },
      },
      label: "Default Border Color",
      view: "hex",
    },
    label: "Border Color",
    component: "color",
  },
  font_size: {
    value: 16,
    label: "Font Size",
    component: "number",
  },
  border_radius: {
    value: 8,
    label: "Border Radius",
    component: "number",
  },
  border_style: {
    value: "solid",
    label: "Border Style",
    component: "select",
  },
};
