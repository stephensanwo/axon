import { ContentAction, ContentState } from "src/context/content/index.types";
import {
  ContentEntity,
  ContentTypeKeys,
} from "src/domain/content/content.entity";
import MarkdownContent from "./components/MarkdownContent";
import CodeContent from "./components/CodeContent";
import JsonContent from "./components/JsonContent";
import BlockContent from "./components/BlockContent";
import TableContent from "./components/TableContent";

export type BaseContentProps = {
  contentState: ContentState;
  contentStateDispatch: React.Dispatch<ContentAction>;
  contentId: string | undefined;
  setContentId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ContentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: BlockContent,
  table: TableContent,
};