import { Color } from "src/components/ColorPicker/index.types";
import { BaseEntity } from "src/db/db.types";

export type ColorViews = "hex" | "rgb" | "hsv";

export interface ColorData {
  label: string;
  value: Color;
  view: ColorViews;
}

export type ColorEntity = BaseEntity & ColorData;

export const SettingsQueryKeys = {
  SETTINGS: ["settings"],
} satisfies Record<string, string[]>;

export interface SettingsEntity {
  colors: ColorEntity[];
}
