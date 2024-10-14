import { useDataMutation } from "src/hooks/api/useDataMutation";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ContentEntity } from "src/domain/content/content.entity";
import {
  CreateContentDto,
  UpdateContentDto,
} from "src/domain/content/content.dto";
import { useContentRoute } from "./useContentRoute";
import contentService from "src/domain/content/content.service";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { ContentQueryKeys } from "../index.types";

export function useContent(): {
  createContent: UseMutationResult<
    ContentEntity,
    unknown,
    CreateContentDto,
    unknown
  >;
  updateContent: UseMutationResult<boolean, unknown, UpdateContentDto, unknown>;
  deleteContent: UseMutationResult<boolean, unknown, string[], unknown>;
  contentList: UseQueryResult<ContentEntity[], unknown>;
  content: UseQueryResult<ContentEntity | null, unknown>;
} {
  const { contentName, contentPreviewId } = useContentRoute();

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

  const contentList = useDataQuery<ContentEntity[]>({
    queryKey: [...ContentQueryKeys.CONTENT],
    queryFn: async () => contentService.getAllContent(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  console.log("contentName", contentName);
  console.log("contentPreviewId", contentPreviewId);
  const content = useDataQuery<ContentEntity | null>({
    queryKey: [...ContentQueryKeys.CONTENT, contentName || contentPreviewId],
    queryFn: async () =>
      contentName
        ? contentService.getContent(contentName)
        : contentPreviewId
          ? contentService.getContentById(contentPreviewId)
          : null,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return {
    createContent,
    updateContent,
    deleteContent,
    contentList,
    content,
  };
}
