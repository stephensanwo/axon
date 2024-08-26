import { UseQueryResult } from "@tanstack/react-query";
import { GetBoardResponseDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import { ProjectEntity } from "src/domain/project/project.entity";

export type BoardState = {
  data: BoardEntity | null;
  query: UseQueryResult<GetBoardResponseDto | null, unknown>;
  selectedBoards: BoardEntity[];
  pinnedBoards: BoardEntity[];
  project: ProjectEntity | null;
};

export enum BoardRouteParams {
  BOARD_NAME = "boardName",
}

export type BoardAction = {
  type: "INIT_BOARD";
  payload: {
    data: BoardEntity | null;
    query: UseQueryResult<GetBoardResponseDto | null, unknown>;
    project: ProjectEntity | null;
  };
};
