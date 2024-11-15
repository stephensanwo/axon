import { ContentEntityKeys } from "src/domain/content/content.entity";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
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

export enum ContentRouteParams {
  CONTENT_ID_FROM_PATH = "contentIdFromPath",
  CONTENT_PREVIEW = "preview",
  CONTENT_FOLDER_NAME = "contentFolderName",
}

export const ContentQueryKeys = {
  CONTENT: [ContentEntityKeys.CONTENT],
  CONTENT_FOLDERS: [ContentEntityKeys.CONTENT, "folders"],
};

export type CreateContentMutation = UseMutationResult<
  ContentEntity,
  unknown,
  CreateContentDto,
  unknown
>;

export type UpdateContentMutation = UseMutationResult<
  boolean,
  unknown,
  UpdateContentDto,
  unknown
>;

export type DeleteContentMutation = UseMutationResult<
  boolean,
  unknown,
  string[],
  unknown
>;

export type CreateContentFolderMutation = UseMutationResult<
  ContentFolderEntity,
  unknown,
  CreateContentFolderDto,
  unknown
>;

export type UpdateContentFolderMutation = UseMutationResult<
  boolean,
  unknown,
  UpdateContentFolderDto,
  unknown
>;

export type DeleteContentFolderMutation = UseMutationResult<
  boolean,
  unknown,
  string[],
  unknown
>;

export type UpdateContentTypeDataMutation = UseMutationResult<
  boolean,
  unknown,
  UpdateContentTypeDataDto,
  unknown
>;

export type ContentListQuery = UseQueryResult<
  GetContentListResponseDto | null,
  unknown
>;

export type ContentTypeDataQuery = UseQueryResult<
  GetContentTypeDataResponseDto | null,
  unknown
>;

export type ContentFoldersQuery = UseQueryResult<
  ContentFolderEntity[],
  unknown
>;

export type ContentQuery = UseQueryResult<ContentEntity | null, unknown>;

export type ContentStore = {
  selectedContent: ContentEntity[];
  setSelectedContent: (selectedContent: ContentEntity[]) => void;
  contentTableFilter: string;
  setContentTableFilter: (contentTableFilter: string) => void;
  showFavoriteFolders: boolean;
  setShowFavoriteFolders: (showFavoriteFolders: boolean) => void;
  sortContentFoldersBy: ContentSortVariants;
  setSortContentFoldersBy: (sortContentFoldersBy: ContentSortVariants) => void;
  leftPanel: boolean;
  setLeftPanel: (leftPanel: boolean) => void;
};

export const STORAGE_KEYS = {
  SHOW_FAVORITES: "content_show_favorites",
  SORT_BY: "content_sort_by",
  LEFT_PANEL_CONTENT_FOLDERS: "show_folders",
  CONTENT_TABLE_FILTER: "content_filter",
} as const;

export type ContentSortVariants = "name" | "updated" | "created";