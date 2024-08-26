import { useDataMutation } from "src/hooks/api/useDataMutation";
import { CreateBoardDto, UpdateBoardDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import boardService from "src/domain/board/board.service";
import { UseMutationResult } from "@tanstack/react-query";
import { ProjectQueryKeys } from "src/domain/project/project.entity";
import { useProjectRoute } from "src/context/project/hooks/useProjectRoute";

export function useBoard(): {
  createBoard: UseMutationResult<BoardEntity, unknown, CreateBoardDto, unknown>;
  updateBoard: UseMutationResult<boolean, unknown, UpdateBoardDto, unknown>;
  deleteBoard: UseMutationResult<boolean, unknown, string[], unknown>;
} {
  const { projectName } = useProjectRoute();

  const createBoard = useDataMutation<CreateBoardDto, BoardEntity>({
    mutationFn: async (dto: CreateBoardDto) => boardService.createBoard(dto),
    optionalQueryKeysToInvalidate: [
      [...ProjectQueryKeys.PROJECT_FILES, projectName!!],
    ],
  });

  const deleteBoard = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => boardService.deleteBoard(dto),
    optionalQueryKeysToInvalidate: [
      [...ProjectQueryKeys.PROJECT_FILES, projectName!!],
    ],
    onSuccessCallback: () => {},
  });

  const updateBoard = useDataMutation<UpdateBoardDto, boolean>({
    mutationFn: async (dto: UpdateBoardDto) => boardService.updateBoard(dto),
    optionalQueryKeysToInvalidate: [
      [...ProjectQueryKeys.PROJECT_FILES, projectName!!],
    ],
  });

  return {
    createBoard,
    updateBoard,
    deleteBoard,
  };
}
