import {
  BlockData,
  CodeData,
  ContentType,
  JsonData,
  MarkdownData,
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
  } as MarkdownData,
  json: {
    content_type: "json",
    code: "",
  } as JsonData,
  block: {
    content_type: "block",
    data: "",
  } as BlockData,
};
