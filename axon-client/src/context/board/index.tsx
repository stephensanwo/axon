import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { useBoardRoute } from "./hooks/useBoardRoute";
import { BoardAction, BoardState } from "./board.types";
import { GetBoardResponseDto } from "src/domain/board/board.dto";
import boardService from "src/domain/board/board.service";
import { boardReducer } from "./board.reducer";
import { BoardQueryKeys } from "src/domain/board/board.entity";
import nodeService from "src/domain/node/node.service";
import { GetNodesResponseDto } from "src/domain/node/node.dto";
import edgeService from "src/domain/edge/edge.service";
import { GetEdgesResponseDto } from "src/domain/edge/edge.dto";

interface BoardProviderProps {
  children: React.ReactNode;
}

interface BoardContextProps {
  boardState: BoardState;
  boardStateDispatch: React.Dispatch<BoardAction>;
}

const BoardContext = createContext({} as BoardContextProps);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const { boardName } = useBoardRoute();

  const boardQuery = useDataQuery<GetBoardResponseDto | null>({
    queryKey: [...BoardQueryKeys.BOARD, boardName || "notfound"],
    queryFn: async () => boardService.getBoard(boardName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const nodeQuery = useDataQuery<GetNodesResponseDto>({
    queryKey: [...BoardQueryKeys.BOARD, boardName || "notfound", "nodes"],
    queryFn: async () => nodeService.getNodes(boardName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const edgeQuery = useDataQuery<GetEdgesResponseDto>({
    queryKey: [...BoardQueryKeys.BOARD, boardName || "notfound", "edges"],
    queryFn: async () => edgeService.getEdges(boardName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [boardState, boardStateDispatch] = useReducer<
    Reducer<BoardState, BoardAction>
  >(boardReducer, {
    board: null,
    boardQuery: boardQuery,
    selectedBoards: [],
    pinnedBoards: [],
    project: null,
    nodes: {
      data: [],
      nodeQuery: nodeQuery,
    },
    edges: {
      data: [],
      edgeQuery: edgeQuery,
    },
  });

  useEffect(() => {
    if (boardQuery.data && boardQuery.isFetched) {
      boardStateDispatch({
        type: "INIT_BOARD",
        payload: {
          board: boardQuery.data.board,
          boardQuery: boardQuery,
          project: boardQuery.data.project,
        },
      });
    }

    if (nodeQuery.data && nodeQuery.isFetched) {
      boardStateDispatch({
        type: "INIT_NODES",
        payload: {
          nodes: nodeQuery.data.nodes,
          nodeQuery: nodeQuery,
        },
      });
    }

    if (edgeQuery.data && edgeQuery.isFetched) {
      boardStateDispatch({
        type: "INIT_EDGES",
        payload: {
          edges: edgeQuery.data.edges,
          edgeQuery: edgeQuery,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardQuery.data, nodeQuery.data]);

  return (
    <BoardContext.Provider
      value={{
        boardState,
        boardStateDispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
