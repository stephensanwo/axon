import {
  BlockData,
  CodeData,
  ContentType,
  JsonData,
  MarkdownData,
  TableData,
} from "./content.entity";

export const defaultContentTypes: ContentType = {
  code: {
    content_type: "code",
    code: "",
    language: "typescript",
  } as CodeData,
  markdown: {
    content_type: "markdown",
    data: "",
    view: "input",
  } as MarkdownData,
  json: {
    content_type: "json",
    code: "",
  } as JsonData,
  block: {
    content_type: "block",
    data: "",
  } as BlockData,
  table: {
    content_type: "table",
    data: {
      header: {},
      data: [],
      columnOrder: [],
    },
  } as TableData,
};
