import { NodeContentTypes } from "src/types/node";
import Markdown from "./ContentTypes/Markdown";
import Code from "./ContentTypes/Code";
import JsonEditor from "./ContentTypes/JsonEditor";
import Block from "./ContentTypes/Block";

export const ContentRouter: Record<NodeContentTypes, React.FC> = {
  markdown: Markdown,
  code: Code,
  json_editor: JsonEditor,
  block_editor: Block,
};

export const ContentComponent: React.FC<{ contentType: NodeContentTypes }> = (
  props
) => {
  const Content = ContentRouter[props.contentType];
  return <Content />;
};
