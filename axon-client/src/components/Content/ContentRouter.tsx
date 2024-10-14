import MarkdownContent from "./components/MarkdownContent";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import CodeContent from "./components/CodeContent";
import JsonContent from "./components/JsonContent";
import BlockContent from "./components/BlockContent";
import TableContent from "./components/TableContent";
import { BaseContentProps } from "./index.types";

export const ContentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: BlockContent,
  table: TableContent,
};

export function ContentRouterComponent(props: BaseContentProps) {
  console.log("content type", props.content.data?.content_type);
  const Content =
    ContentRouter[props.content.data?.content_type as ContentTypeKeys];
  return <Content {...props} />;
}
