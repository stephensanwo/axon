import { BoardEntityKeys } from "src/domain/board/board.entity";
import { ProjectFilesQueryKeys } from "../project/project.types";

export enum BoardRouteParams {
  BOARD_NAME = "boardName",
}

export const BoardQueryKeys = [...ProjectFilesQueryKeys, BoardEntityKeys.BOARD];
