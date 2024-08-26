import { BoardAction, BoardState } from "src/context/board/board.types";

export type BaseBoardProps = {
  boardState: BoardState;
  boardStateDispatch: React.Dispatch<BoardAction>;
};
