import React, { useMemo } from "react";
import { Box, useTheme } from "@primer/react";
import ReactMarkdown from "react-markdown";
import Editor from "src/components/CodeEditor/Editor";
import { useMarkdown } from "src/hooks/content/useMarkdown";
import { MarkdownPreview } from "./styles";
import { getMarkdownComponents } from "./components";
import { REHYPE_MARKDOWN_PLUGINS, REMARK_MARKDOWN_PLUGINS } from "./plugins";

export const AxonMarkdownInput: React.FC<{}> = () => {
  const { markdown, handleMarkdownUpdate } = useMarkdown();

  return (
    <Box>
      <Editor
        defaultValue="Add Markdown here..."
        language={"markdown"}
        value={markdown?.data!!}
        loading={"Loading Markdown..."}
        onChange={(value, event) => handleMarkdownUpdate(value, event)}
        overrideOptions={{
          lineNumbers: "off",
          renderLineHighlight: "none",
        }}
      />
    </Box>
  );
};

export const AxonMarkdownPreview: React.FC<{}> = () => {
  const { markdown } = useMarkdown();
  const { theme } = useTheme();
  const MARKDOWN_COMPONENTS = useMemo(() => {
    return getMarkdownComponents(theme!!);
  }, []);
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
