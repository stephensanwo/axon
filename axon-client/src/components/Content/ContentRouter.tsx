import MarkdownContent from "./components/MarkdownContent";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import { ContentRouterProps } from "./index.types";
import CodeContent from "./components/CodeContent";
import JsonContent from "./components/JsonContent";
import BlockContent from "./components/BlockContent";
import TableContent from "./components/TableContent";

export const ContentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: BlockContent,
  table: TableContent,
};

export function ContentRouterComponent(props: ContentRouterProps) {
  console.log("props", props);
  const content_type = props.previewContent.content_type;
  console.log("content_type", content_type);
  const Content = ContentRouter[content_type as ContentTypeKeys];
  return <Content {...props} />;
}
