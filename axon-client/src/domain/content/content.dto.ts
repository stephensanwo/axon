import { BaseEntity } from "src/db/db.types";
import {
  ContentData,
  ContentEntity,
  ContentTypeData,
  ContentTypeKeys,
} from "./content.entity";

export type CreateContentDto = ContentData & {
  content: ContentTypeData;
};

export type UpdateContentDto = ContentEntity;
