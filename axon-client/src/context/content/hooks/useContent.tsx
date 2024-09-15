import { useDataMutation } from "src/hooks/api/useDataMutation";
import { UseMutationResult } from "@tanstack/react-query";
import {
  ContentEntity,
  ContentQueryKeys,
} from "src/domain/content/content.entity";
import {
  CreateContentDto,
  UpdateContentDto,
} from "src/domain/content/content.dto";
import { useContentRoute } from "./useContentRoute";
import contentService from "src/domain/content/content.service";

export function useContent(): {
  createContent: UseMutationResult<
    ContentEntity,
    unknown,
    CreateContentDto,
    unknown
  >;
  updateContent: UseMutationResult<boolean, unknown, UpdateContentDto, unknown>;
  deleteContent: UseMutationResult<boolean, unknown, string[], unknown>;
} {
  const { contentName } = useContentRoute();

  const createContent = useDataMutation<CreateContentDto, ContentEntity>({
    mutationFn: async (dto: CreateContentDto) =>
      contentService.createContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
  });

  const deleteContent = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => contentService.deleteContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
    onSuccessCallback: () => {},
  });

  const updateContent = useDataMutation<UpdateContentDto, boolean>({
    mutationFn: async (dto: UpdateContentDto) =>
      contentService.updateContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
  });

  return {
    createContent,
    updateContent,
    deleteContent,
  };
}
