import MarkdownContent from "./components/MarkdownContent";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import { BaseContentProps } from "./index.types";
import CodeContent from "./components/CodeContent";
import JsonContent from "./components/JsonContent";

export const ContentRouter: Record<ContentTypeKeys, React.ElementType> = {
  markdown: MarkdownContent,
  code: CodeContent,
  json: JsonContent,
  block: MarkdownContent,
};

export function ContentRouterComponent(props: BaseContentProps) {
  const content_type = props.contentState.content.data?.content.content_type;
  const Content = ContentRouter[content_type as ContentTypeKeys];
  return <Content {...props} />;
}
