import {
  ContentData,
  ContentEntity,
  ContentTypeData,
  ContentTypeDataEntity,
} from "./content.entity";

export type CreateContentDto = ContentData;

export type CreateContentTypeDataDto = {
  content_id: string;
  content: ContentTypeData;
};

export type UpdateContentTypeDataDto = ContentTypeDataEntity;

export type UpdateContentDto = ContentEntity;

export type GetContentTypeDataResponseDto = {
  parent_content: ContentEntity;
} & ContentTypeDataEntity;
