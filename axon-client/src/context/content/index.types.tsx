import { UseQueryResult } from "@tanstack/react-query";
import { ContentEntity } from "src/domain/content/content.entity";

export type ContentState = {
  contentList: {
    data: ContentEntity[];
    pinnedContent: ContentEntity[];
    selectedContent: ContentEntity[];
    previewContent: ContentEntity | null;
    contentListQuery: UseQueryResult<ContentEntity[] | null, unknown>;
  };
  content: {
    data: ContentEntity | null;
    contentQuery: UseQueryResult<ContentEntity | null, unknown>;
  };
};

export enum ContentRouteParams {
  CONTENT_NAME = "contentName",
}

export type ContentAction =
  | {
      type: "INIT_CONTENT_LIST";
      payload: {
        contentList: ContentEntity[];
        contentListQuery: UseQueryResult<ContentEntity[] | null, unknown>;
      };
    }
  | {
      type: "INIT_CONTENT";
      payload: {
        content: ContentEntity;
        contentQuery: UseQueryResult<ContentEntity | null, unknown>;
      };
    }
  | {
      type: "SELECT_CONTENT";
      payload: ContentEntity;
    }
  | {
      type: "PREVIEW_CONTENT";
      payload: ContentEntity;
    }
  | {
      type: "REMOVE_SELECTED_CONTENT";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_CONTENT";
    }
  | {
      type: "RESET_CONTENT";
    };
