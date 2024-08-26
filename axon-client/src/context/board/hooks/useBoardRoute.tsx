import { useParams } from "react-router-dom";
import { BoardRouteParams } from "../board.types";

export function useBoardRoute(): {
  boardName: string | undefined;
} {
  const { boardName } = useParams<BoardRouteParams>();

  return { boardName };
}
