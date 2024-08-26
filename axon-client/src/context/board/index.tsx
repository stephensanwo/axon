import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { useBoardRoute } from "./hooks/useBoardRoute";
import { BoardAction, BoardState } from "./board.types";
import { GetBoardResponseDto } from "src/domain/board/board.dto";
import boardService from "src/domain/board/board.service";
import { boardReducer } from "./board.reducer";
import { BoardQueryKeys } from "src/domain/board/board.entity";

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

  const [boardState, boardStateDispatch] = useReducer<
    Reducer<BoardState, BoardAction>
  >(boardReducer, {
    data: null,
    query: boardQuery,
    selectedBoards: [],
    pinnedBoards: [],
    project: null,
  });

  useEffect(() => {
    if (boardQuery.data && boardQuery.isFetched) {
      boardStateDispatch({
        type: "INIT_BOARD",
        payload: {
          data: boardQuery.data.board,
          query: boardQuery,
          project: boardQuery.data.project,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardQuery.data]);

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
