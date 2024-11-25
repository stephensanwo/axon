import { ContentTypeKeys } from "src/domain/content/content.entity";
import MarkdownContent from "./MarkdownContent";
import CodeContent from "./CodeContent";
import JsonContent from "./JsonContent";
import BlockContent from "./BlockContent";
import TableContent from "./TableContent";

export const ComponentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: BlockContent,
  table: TableContent,
};
