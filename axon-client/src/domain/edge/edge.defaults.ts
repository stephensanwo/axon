import { EdgeStyle } from "./edge.entity";

export const defaultEdgeStyles: EdgeStyle = {
  color: {
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
      label: "Default Edge Color",
      view: "hex",
    },
    label: "Edge Color",
    component: "color",
  },
  width: {
    value: 2,
    label: "Edge Width",
    component: "number",
  },
  type: {
    value: "straightEdge",
    label: "Edge Type",
    component: "select",
  },
  animated: {
    value: false,
    label: "Animation",
    component: "toggle",
  },
  label: {
    value: false,
    label: "Label",
    component: "toggle",
  },
  marker: {
    value: "end",
    label: "Marker",
    component: "select",
  },
};
