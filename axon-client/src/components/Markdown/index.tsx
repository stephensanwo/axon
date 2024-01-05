import React from "react";
import ReactMarkdown from "react-markdown";
import { MarkdownPreview } from "./styles";
import { MARKDOWN_COMPONENTS } from "./components";
import { REHYPE_MARKDOWN_PLUGINS, REMARK_MARKDOWN_PLUGINS } from "./plugins";
import Editor from "../CodeEditor/Editor";
import { useMarkdown } from "src/hooks/content/useMarkdown";

export const AxonMarkdownInput: React.FC<{}> = () => {
  const { markdown, handleMarkdownUpdate } = useMarkdown();

  return (
    <Editor
      defaultValue="Add Markdown here..."
      language={"markdown"}
      value={markdown?.data!!}
      loading={"Loading Markdown..."}
      onChange={(value, event) => handleMarkdownUpdate(value, event)}
      overrideOptions={{
        lineNumbers: "off",
      }}
    />
  );
};

export const AxonMarkdownPreview: React.FC<{}> = () => {
  const { markdown } = useMarkdown();

  return (
    <MarkdownPreview>
      <ReactMarkdown
        children={markdown?.data!!}
        remarkPlugins={REMARK_MARKDOWN_PLUGINS}
        rehypePlugins={REHYPE_MARKDOWN_PLUGINS}
        components={MARKDOWN_COMPONENTS}
        remarkRehypeOptions={{
          allowDangerousHtml: false,
        }}
      />
    </MarkdownPreview>
  );
};
