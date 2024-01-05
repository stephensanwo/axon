import Editor, { EditorProps } from "@monaco-editor/react";
import { CustomEditorTheme } from "./theme";
import React from "react";
import { BASE_EDITOR_OPTIONS } from "./options";
import { editor } from "monaco-editor";

interface CodeEditorProps extends EditorProps {
  // Custom props
  overrideOptions?: editor.IStandaloneEditorConstructionOptions;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  height = "100vh",
  width = "100%",
  defaultValue = "// Start adding code here",
  theme = "customEditorTheme",
  language,
  value,
  line = 1,
  loading = "Loading Code Editor...",
  onMount,
  onChange,
  options = BASE_EDITOR_OPTIONS,
  beforeMount = (monaco) => {
    monaco.editor.defineTheme("customEditorTheme", CustomEditorTheme);
  },
  overrideOptions,
}): JSX.Element => {
  return (
    <Editor
      height={height}
      width={width}
      defaultValue={defaultValue}
      theme={theme}
      language={language}
      value={value}
      line={line}
      loading={loading}
      onMount={onMount}
      onChange={onChange}
      options={{
        ...options, // Spread the base options
        ...overrideOptions, // Apply specific overrides
      }}
      beforeMount={beforeMount}
    />
  );
};

export default CodeEditor;
