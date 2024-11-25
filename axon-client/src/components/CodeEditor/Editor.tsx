import Editor, { EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useTheme } from "@primer/react";
import { getCustomEditorTheme } from "./theme";
import { BASE_EDITOR_OPTIONS } from "./options";

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
  line = 0,
  loading = "Loading Code Editor...",
  onMount,
  onChange,
  options = BASE_EDITOR_OPTIONS,
  overrideOptions,
  beforeMount,
}): JSX.Element => {
  const { theme: axonTheme } = useTheme();
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
      beforeMount={(monaco) => {
        monaco.editor.defineTheme(
          "customEditorTheme",
          getCustomEditorTheme(axonTheme!!)
        );
        beforeMount && beforeMount(monaco);
      }}
      className=" bg-red-500"
    />
  );
};

export default CodeEditor;
