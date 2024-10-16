import { ContentEntityKeys } from "src/domain/content/content.entity";

export enum ContentRouteParams {
  CONTENT_ID_FROM_PATH = "contentIdFromPath",
  CONTENT_PREVIEW = "preview",
}

export const ContentQueryKeys = {
  CONTENT: [ContentEntityKeys.CONTENT],
};
