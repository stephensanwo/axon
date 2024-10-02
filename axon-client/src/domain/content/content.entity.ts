import { TableCellTypes } from "src/components/DataSheet/index.types";
import { BaseEntity } from "src/db/db.types";

export type ContentData = {
  name: string;
  content_type: ContentTypeKeys;
  pinned: boolean;
};

export enum ContentTypeEnums {
  CODE = "code",
  MARKDOWN = "markdown",
  JSON = "json",
  BLOCK = "block",
  TABLE = "table",
}

export type CodeData = {
  content_type: "code";
  code: string;
  language: string;
};

export type MarkdownViews = "input" | "preview";
export interface MarkdownData {
  content_type: "markdown";
  data: string;
  view: MarkdownViews;
}

export type JsonData = {
  content_type: "json";
  code: string;
};

export type BlockData = {
  content_type: "block";
  data: string;
};

export type TableData = {
  content_type: "table";
  data: {
    header: Record<
      string,
      {
        key: string;
        value: string;
        type: keyof typeof TableCellTypes;
      }
    >;
    data: Record<string, string>[];
    columnOrder: string[];
  };
};

export type ContentTypeData =
  | CodeData
  | MarkdownData
  | JsonData
  | BlockData
  | TableData;

export type ContentTypeKeys = ContentTypeData["content_type"];

export type ContentEntity = BaseEntity &
  ContentData & {
    content: ContentTypeData;
  };

export type ContentType = Record<ContentTypeKeys, ContentTypeData>;

export type ContentTypeEntity = BaseEntity & ContentType;

export const ContentQueryKeys = {
  CONTENT: ["content"],
} satisfies Record<string, string[]>;
