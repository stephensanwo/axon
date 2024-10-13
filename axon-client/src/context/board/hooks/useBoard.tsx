import { useDataMutation } from "src/hooks/api/useDataMutation";
import {
  CreateBoardDto,
  GetBoardResponseDto,
  UpdateBoardDto,
} from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import boardService from "src/domain/board/board.service";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useProjectRoute } from "src/context/project/hooks/useProjectRoute";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { ProjectFilesQueryKeys } from "src/context/project/project.types";
import { BoardQueryKeys } from "../board.types";
import { useBoardRoute } from "./useBoardRoute";

export function useBoard(): {
  createBoard: UseMutationResult<BoardEntity, unknown, CreateBoardDto, unknown>;
  updateBoard: UseMutationResult<boolean, unknown, UpdateBoardDto, unknown>;
  deleteBoard: UseMutationResult<boolean, unknown, string[], unknown>;
  boardQuery: UseQueryResult<GetBoardResponseDto | null, unknown>;
} {
  const { projectName } = useProjectRoute();
  const { boardName } = useBoardRoute();

  const createBoard = useDataMutation<CreateBoardDto, BoardEntity>({
    mutationFn: async (dto: CreateBoardDto) => boardService.createBoard(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFilesQueryKeys, projectName!!]],
  });

  const deleteBoard = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => boardService.deleteBoard(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFilesQueryKeys, projectName!!]],
    onSuccessCallback: () => {},
  });

  const updateBoard = useDataMutation<UpdateBoardDto, boolean>({
    mutationFn: async (dto: UpdateBoardDto) => boardService.updateBoard(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFilesQueryKeys, projectName!!]],
  });

  const boardQuery = useDataQuery<GetBoardResponseDto | null>({
    queryKey: [...BoardQueryKeys, boardName],
    queryFn: async () => boardService.getBoard(boardName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  // const nodeQuery = useDataQuery<GetNodesResponseDto | null>({
  //   queryKey: [...BoardQueryKeys.BOARD, boardName || "notfound", "nodes"],
  //   queryFn: async () => nodeService.getNodes(boardName || ""),
  //   refetchOnMount: true,
  //   refetchOnReconnect: true,
  //   refetchOnWindowFocus: true,
  // });

  // const edgeQuery = useDataQuery<GetEdgesResponseDto>({
  //   queryKey: [...BoardQueryKeys.BOARD, boardName || "notfound", "edges"],
  //   queryFn: async () => edgeService.getEdges(boardName || ""),
  //   refetchOnMount: true,
  //   refetchOnReconnect: true,
  //   refetchOnWindowFocus: true,
  // });

  return {
    createBoard,
    updateBoard,
    deleteBoard,
    boardQuery,
  };
}
