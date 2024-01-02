import React from "react";
import ReactMarkdown from "react-markdown";
import { MarkdownPreview } from "./styles";
import { MARKDOWN_COMPONENTS } from "./components";
import { REHYPE_MARKDOWN_PLUGINS, REMARK_MARKDOWN_PLUGINS } from "./plugins";
import Editor from "../CodeEditor/Editor";
import { useMarkdown } from "src/hooks/content/useMarkdown";

export const AxonMarkdownInput: React.FC<{}> = () => {
  const { markdown, handleMarkdownUpdate } = useMarkdown();
  console.log("markdown from input", markdown?.data);
  return (
    <Editor
      height="100vh"
      width="100%"
      defaultValue="Add Markdown here..."
      theme="vs-dark"
      language={"markdown"}
      value={markdown?.data!!}
      line={0}
      loading={"Loading Markdown..."}
      onChange={(value, event) => handleMarkdownUpdate(value, event)}
      options={{
        minimap: {
          enabled: false,
        },
        fontFamily: "IBM Plex Mono",
        fontSize: 14,
        tabSize: 8,
        padding: {
          top: 14,
          bottom: 14,
        },
        detectIndentation: true,
        readOnly: false,
        autoIndent: "advanced",
        bracketPairColorization: {
          enabled: true,
        },
        scrollBeyondLastLine: true,
        lineNumbers: "off",
        wordWrap: "on",
        wrappingIndent: "indent",
        wrappingStrategy: "advanced",
        renderLineHighlight: "all",
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: false,
        renderLineHighlightOnlyWhenFocus: false,
        renderValidationDecorations: "on",
        renderWhitespace: "all",
        selectionHighlight: false,
        "semanticHighlighting.enabled": true,
        formatOnType: true,
        formatOnPaste: true,

        // Disable suggestions/intellisense
        quickSuggestions: false,
        // "suggestionActions.disable": ['json'],
        // suggestionActions: {
        //   disableFor: ["json"]
        // },

        // More JSON-focused options
        folding: true,
      }}
      // Add JSON linting
      onMount={(editor) => {}}
    />
  );
};

export const AxonMarkdownPreview: React.FC<{}> = () => {
  const { markdown } = useMarkdown();
  console.log("markdown from preview", markdown?.data);

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
