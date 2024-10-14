import { ContentEntityKeys } from "src/domain/content/content.entity";

export enum ContentRouteParams {
  CONTENT_NAME = "contentName",
  CONTENT_PREVIEW = "preview",
}

export const ContentQueryKeys = {
  CONTENT: [ContentEntityKeys.CONTENT],
};
