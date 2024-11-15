import { Edge } from "@xyflow/react";
import { ColorData, SettingsComponentTypes } from "../settings/settings.entity";
import { BaseEntity } from "src/db/db.types";

export interface EdgeDataProps extends Record<string, unknown> {
  user_id: string;
  board_id: string;
  note_id: string;
  edge_id: string; // Same as id
  type: EdgeTypes;
  semantic_number?: number;
}

export type EdgeEntity = Edge<EdgeDataProps>;

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

export enum EdgeEntityKeys {
  EDGES = "edges",
  EDGE_DEFAULTS = "edge-defaults",
}
