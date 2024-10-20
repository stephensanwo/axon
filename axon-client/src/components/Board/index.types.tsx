import { UseQueryResult } from "@tanstack/react-query";
import { GetBoardResponseDto } from "src/domain/board/board.dto";

export type BaseBoardProps = {
  board: UseQueryResult<GetBoardResponseDto | null, unknown>;
};
