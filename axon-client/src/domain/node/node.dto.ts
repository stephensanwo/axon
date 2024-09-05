import { BaseEntity } from "src/db/db.types";
import { NodeEntity, NodeStyle } from "./node.entity";

export type UpdateNodeStyleDto = BaseEntity & NodeStyle;

export type GetNodesResponseDto = {
  board_id: string | null;
  nodes: NodeEntity[];
};