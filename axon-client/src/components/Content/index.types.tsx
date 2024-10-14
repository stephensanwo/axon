import {
  ContentEntity,
  ContentTypeKeys,
} from "src/domain/content/content.entity";
import MarkdownContent from "./components/MarkdownContent";
import CodeContent from "./components/CodeContent";
import JsonContent from "./components/JsonContent";
import BlockContent from "./components/BlockContent";
import TableContent from "./components/TableContent";
import { UseQueryResult } from "@tanstack/react-query";

export type BaseContentProps = {
  contentList: UseQueryResult<ContentEntity[], unknown>;
  content: UseQueryResult<ContentEntity | null, unknown>;
};

export const ContentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: BlockContent,
  table: TableContent,
};
