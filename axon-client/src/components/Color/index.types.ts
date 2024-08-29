import { IColor } from "react-color-palette";

export type Color = IColor;
export type ColorViews = "hex" | "rgb" | "hsv";

export interface IColorPickerProps {
  height?: number;
  hideAlpha?: boolean;
  hideInput?: (keyof IColor)[] | boolean;
  defaultColor?: string;
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
  view: ColorViews;
  setView: React.Dispatch<React.SetStateAction<ColorViews>>;
}
