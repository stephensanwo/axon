import { BaseEntity } from "src/db/db.types";
import { EdgeEntity, EdgeStyle } from "./edge.entity";

export type UpdateEdgeStyleDto = BaseEntity & EdgeStyle;

export type GetEdgesResponseDto = {
  board_id: string | null;
  edges: EdgeEntity[];
};