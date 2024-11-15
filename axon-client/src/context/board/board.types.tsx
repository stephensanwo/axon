import { BoardEntityKeys } from "src/domain/board/board.entity";
import { ProjectFilesQueryKeys } from "../project/project.types";

export enum BoardRouteParams {
  BOARD_NAME = "boardName",
}

export const BoardQueryKeys = [...ProjectFilesQueryKeys, BoardEntityKeys.BOARD];

export type NodeOptionsProps = {
  state: "open" | "closed";
  component: NodeOptionsComponents;
};

export type NodeOptionsComponents = "formatting";

export type NodeContentProps = {
  state: "open" | "closed";
};
