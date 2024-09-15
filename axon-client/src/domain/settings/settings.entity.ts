import { Color } from "src/components/Color/index.types";
import { BaseEntity } from "src/db/db.types";
import { NodeStyleEntity } from "../node/node.entity";
import { EdgeStyleEntity } from "../edge/edge.entity";
import { BoardSettingsEntity } from "../board/board.entity";
import { ContentType } from "../content/content.entity";

export type ColorViews = "hex" | "rgb" | "hsv";

export interface ColorData {
  label: string;
  value: Color;
  view: ColorViews;
}

export type ColorEntity = BaseEntity & ColorData;

export type SettingsComponentTypes =
  | "color"
  | "number"
  | "input"
  | "select"
  | "checkbox"
  | "toggle";

export const SettingsQueryKeys = {
  SETTINGS: ["settings"],
} satisfies Record<string, string[]>;

export interface SettingsEntity {
  colors: ColorEntity[];
  nodeStyles: NodeStyleEntity;
  edgeStyles: EdgeStyleEntity;
  boardSettings: BoardSettingsEntity;
  contentTypes: ContentType;
}
