import { Color } from "src/components/Color/index.types";
import { ColorViews } from "src/domain/settings/settings.entity";

export function colorToString(color: Color, view: ColorViews): string {
  const { hex, rgb, hsv } = color;

  if (view === "hsv") {
    return `HSV ${hsv.h.toFixed(2)}, ${hsv.s.toFixed(2)}, ${hsv.v.toFixed(2)} ${hsv.a.toFixed(2)}`;
  }

  if (view === "rgb") {
    return `RGB ${rgb.r.toFixed(2)}, ${rgb.g.toFixed(2)}, ${rgb.b.toFixed(2)}, ${rgb.a.toFixed(2)}`;
  }

  return `HEX ${hex}`;
}
