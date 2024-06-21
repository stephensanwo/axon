import { Edge } from "reactflow";

export interface EdgeDataProps {
  user_id: string;
  folder_id: string;
  note_id: string;
  edge_id: string; // Same as id
  type: EdgeTypes;
  semantic_number?: number;
}

export type IEdge = Edge<EdgeDataProps>;

export type EdgeTypes = "curveEdge" | "stepEdge" | "straightEdge";
