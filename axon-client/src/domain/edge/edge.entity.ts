import { Edge } from "reactflow";
import { ColorData, SettingsComponentTypes } from "../settings/settings.entity";
import { BaseEntity } from "src/db/db.types";

export interface EdgeEntity {
  user_id: string;
  board_id: string;
  note_id: string;
  edge_id: string; // Same as id
  type: EdgeTypes;
  semantic_number?: number;
}

export type IEdge = Edge<EdgeEntity>;

export type EdgeTypes = "curveEdge" | "stepEdge" | "straightEdge";

export type EdgeMarkerDirection = "start" | "end";

export type EdgeStyleData = {
  color: ColorData;
  width: number;
  type: EdgeTypes;
  animated: boolean;
  label: boolean;
  marker: EdgeMarkerDirection;
};

export type EdgeStyleComponentTypes = SettingsComponentTypes;

export type EdgeStyle = {
  [K in keyof EdgeStyleData]: {
    value: EdgeStyleData[K];
    label: string;
    component: EdgeStyleComponentTypes;
  };
};

export type EdgeStyleEntity = BaseEntity & EdgeStyle;
