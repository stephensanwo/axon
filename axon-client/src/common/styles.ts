export function getStyleRange(
  style: "font_weight" | "font_size" | "border_radius" | "width" | string
): {
  minRange: number;
  maxRange: number;
} {
  switch (style) {
    case "font_weight":
      return {
        minRange: 400,
        maxRange: 800,
      };
    case "font_size":
      return {
        minRange: 0,
        maxRange: 24,
      };
    case "border_radius":
      return {
        minRange: 0,
        maxRange: 24,
      };
    case "width":
      return {
        minRange: 0,
        maxRange: 24,
      };
  }
  return {
    minRange: 0,
    maxRange: 0,
  };
}

export function getStyleSteps(
  style: "font_weight" | "font_size" | "border_radius" | "width" | string
) {
  switch (style) {
    case "font_weight":
      return 100;
    case "font_size":
      return 1;
    case "border_radius":
      return 1;
    case "width":
      return 1;
  }
  return 0;
}
