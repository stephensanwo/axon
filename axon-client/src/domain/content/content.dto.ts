import {
  ContentData,
  ContentEntity,
  ContentFolderData,
  ContentFolderEntity,
  ContentTypeData,
  ContentTypeDataEntity,
} from "./content.entity";

export type CreateContentDto = ContentData;

export type CreateContentFolderDto = ContentFolderData;

export type CreateContentTypeDataDto = {
  content_id: string;
  content: ContentTypeData;
};

export type UpdateContentTypeDataDto = ContentTypeDataEntity;

export type UpdateContentDto = ContentEntity;

export type UpdateContentFolderDto = ContentFolderEntity;

export type GetContentTypeDataResponseDto = {
  parent_content: ContentEntity;
} & ContentTypeDataEntity;

export type GetContentListResponseDto = {
  folder: ContentFolderEntity;
  content: ContentEntity[];
};
