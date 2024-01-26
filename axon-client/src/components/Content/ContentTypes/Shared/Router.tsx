import { NodeContentTypes } from "src/types/node";
import Markdown from "../Markdown";
import Code from "../Code";
import JsonEditor from "../JsonEditor";
import BlockNoteEditor from "../BlockNoteEditor";

export const ContentRouter: Record<NodeContentTypes, React.FC> = {
  markdown: Markdown,
  code: Code,
  json_editor: JsonEditor,
  block_editor: BlockNoteEditor,
};

export const ContentComponent: React.FC<{ contentType: NodeContentTypes }> = (
  props
) => {
  const Content = ContentRouter[props.contentType];
  return <Content />;
};
