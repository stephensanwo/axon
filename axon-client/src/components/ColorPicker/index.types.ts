import { IColor } from "react-color-palette";

export interface IColorPickerProps {
  height?: number;
  hideAlpha?: boolean;
  hideInput?: (keyof IColor)[] | boolean;
  defaultColor?: string;
}
