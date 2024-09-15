import { UseQueryResult } from "@tanstack/react-query";
import { GetBoardResponseDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import { GetEdgesResponseDto } from "src/domain/edge/edge.dto";
import { EdgeEntity } from "src/domain/edge/edge.entity";
import { GetNodesResponseDto } from "src/domain/node/node.dto";
import { NodeEntity } from "src/domain/node/node.entity";
import { ProjectEntity } from "src/domain/project/project.entity";

export type BoardState = {
  board: BoardEntity | null;
  boardQuery: UseQueryResult<GetBoardResponseDto | null, unknown>;
  selectedBoards: BoardEntity[];
  pinnedBoards: BoardEntity[];
  project: ProjectEntity | null;
  nodes: {
    data: NodeEntity[];
    nodeQuery: UseQueryResult<GetNodesResponseDto, unknown>;
    selectedNode: NodeEntity | null;
  };
  edges: {
    data: EdgeEntity[];
    edgeQuery: UseQueryResult<GetEdgesResponseDto, unknown>;
  };
};

export enum BoardRouteParams {
  BOARD_NAME = "boardName",
}

export type BoardAction =
  | {
      type: "INIT_BOARD";
      payload: {
        board: BoardEntity | null;
        boardQuery: UseQueryResult<GetBoardResponseDto | null, unknown>;
        project: ProjectEntity | null;
      };
    }
  | {
      type: "INIT_NODES";
      payload: {
        nodes: NodeEntity[];
        nodeQuery: UseQueryResult<GetNodesResponseDto, unknown>;
      };
    }
  | {
      type: "INIT_EDGES";
      payload: {
        edges: EdgeEntity[];
        edgeQuery: UseQueryResult<GetEdgesResponseDto, unknown>;
      };
    };
    
