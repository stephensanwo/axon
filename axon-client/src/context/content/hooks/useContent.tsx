import { useDataMutation } from "src/hooks/api/useDataMutation";
import {
  ContentEntity,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import {
  CreateContentDto,
  CreateContentFolderDto,
  GetContentListResponseDto,
  GetContentTypeDataResponseDto,
  UpdateContentDto,
  UpdateContentFolderDto,
  UpdateContentTypeDataDto,
} from "src/domain/content/content.dto";
import { useContentRoute } from "./useContentRoute";
import contentService from "src/domain/content/content.service";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import {
  ContentQueryKeys,
  CreateContentMutation,
  UpdateContentMutation,
  DeleteContentMutation,
  ContentListQuery,
  ContentTypeDataQuery,
  UpdateContentTypeDataMutation,
  ContentFoldersQuery,
  CreateContentFolderMutation,
  DeleteContentFolderMutation,
  UpdateContentFolderMutation,
} from "../index.types";
import { useNavigate } from "react-router-dom";
import { useToast } from "src/components/Common/Toast/use-toast";

export function useContent(): {
  createContent: CreateContentMutation;
  updateContent: UpdateContentMutation;
  deleteContent: DeleteContentMutation;
  contentList: ContentListQuery;
  contentTypeData: ContentTypeDataQuery;
  updateContentTypeData: UpdateContentTypeDataMutation;
  contentFolders: ContentFoldersQuery;
  createContentFolder: CreateContentFolderMutation;
  deleteContentFolder: DeleteContentFolderMutation;
  updateContentFolder: UpdateContentFolderMutation;
} {
  const { contentId, contentFolderName } = useContentRoute();
  const navigate = useNavigate();
  const { toast } = useToast();

  const createContent = useDataMutation<CreateContentDto, ContentEntity>({
    mutationFn: async (dto: CreateContentDto) =>
      contentService.createContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
  });

  const createContentFolder = useDataMutation<
    CreateContentFolderDto,
    ContentFolderEntity
  >({
    mutationFn: async (dto: CreateContentFolderDto) =>
      contentService.createContentFolder(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
    onSuccessCallback: () => {
      toast({
        title: "Success",
        description: "Content Folder Created",
      });
    },
  });

  const deleteContent = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => contentService.deleteContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
    onSuccessCallback: () => {},
  });

  const deleteContentFolder = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) =>
      contentService.deleteContentFolder(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
    onSuccessCallback: () => {
      toast({
        title: "Success",
        description: "Content Folder Deleted",
        variant: "destructive",
      });
    },
  });

  const updateContent = useDataMutation<UpdateContentDto, boolean>({
    mutationFn: async (dto: UpdateContentDto) =>
      contentService.updateContent(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
  });

  const updateContentFolder = useDataMutation<UpdateContentFolderDto, boolean>({
    mutationFn: async (dto: UpdateContentFolderDto) =>
      contentService.updateContentFolder(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
    onSuccessCallback: (_, variables) => {
      navigate(`/content/${variables?.name}`);
      toast({
        title: "Success",
        description: "Content Folder Updated",
      });
    },
  });

  const contentFolders = useDataQuery<ContentFolderEntity[]>({
    queryKey: [...ContentQueryKeys.CONTENT_FOLDERS],
    queryFn: async () => contentService.getAllContentFolders(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const contentList = useDataQuery<GetContentListResponseDto | null>({
    queryKey: [...ContentQueryKeys.CONTENT, contentFolderName],
    queryFn: async () =>
      contentFolderName
        ? contentService.getContentListByFolderName(contentFolderName)
        : null,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const contentTypeData = useDataQuery<GetContentTypeDataResponseDto | null>({
    queryKey: [...ContentQueryKeys.CONTENT, contentId],
    queryFn: async () =>
      contentId ? contentService.getContentTypeData(contentId) : null,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const updateContentTypeData = useDataMutation<
    UpdateContentTypeDataDto,
    boolean
  >({
    mutationFn: async (dto: UpdateContentTypeDataDto) =>
      contentService.updateContentTypeData(dto),
    optionalQueryKeysToInvalidate: [[...ContentQueryKeys.CONTENT]],
  });

  return {
    createContent,
    updateContent,
    deleteContent,
    contentList,
    contentTypeData,
    updateContentTypeData,
    contentFolders,
    createContentFolder,
    deleteContentFolder,
    updateContentFolder,
  };
}
