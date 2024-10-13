import { useParams, useSearchParams } from "react-router-dom";
import { BoardRouteParams } from "../board.types";

export function useBoardRoute(): {
  boardName: string;
  updateBoardRouteSearchParams: (key: string, value: string) => void;
  clearBoardRouteSearchParams: (key: string) => void;
} {
  const { boardName } = useParams<BoardRouteParams>();
  const [searchParams, setSearchParams] = useSearchParams();

  function updateBoardRouteSearchParams(key: string, value: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  }

  function clearBoardRouteSearchParams(key: string) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
  }

  return {
    boardName: boardName ?? "",
    updateBoardRouteSearchParams,
    clearBoardRouteSearchParams,
  };
}
