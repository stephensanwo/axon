import { ContentData, ContentEntity, ContentTypeData } from "./content.entity";

export type CreateContentDto = ContentData & {
  content: ContentTypeData;
};

export type UpdateContentDto = ContentEntity;
