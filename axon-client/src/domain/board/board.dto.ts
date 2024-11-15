import { BaseEntity } from "src/db/db.types";
import { BoardData, BoardEntity } from "./board.entity";
import { ProjectEntity } from "../project/project.entity";
import { NodeEntity } from "../node/node.entity";
import { EdgeEntity } from "../edge/edge.entity";

export type CreateBoardDto = BoardData;

export type UpdateBoardDto = BaseEntity & BoardData;

export type GetBoardResponseDto = {
  board: BoardEntity;
  project: ProjectEntity;
  nodes: NodeEntity[];
  edges: EdgeEntity[];
};
