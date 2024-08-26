import { BaseEntity } from "src/db/db.types";
import { BoardData, BoardEntity } from "./board.entity";
import { ProjectEntity } from "../project/project.entity";

export type CreateBoardDto = BoardData;

export type UpdateBoardDto = BaseEntity & BoardData;

export type GetBoardResponseDto = {
  board: BoardEntity | null;
  project: ProjectEntity | null;
};
