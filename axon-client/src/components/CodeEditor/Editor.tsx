import MonacoEditor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { CustomEditorTheme } from "./theme";

const Editor: React.FC<{
  height?: string;
  width?: string;
  defaultValue?: string;
  theme?: string;
  language: string;
  value: string;
  line?: number;
  loading?: string;
  onMount: (editor: any, monaco: any) => void;
  onChange: (value: string | undefined, event: any) => void;
  options?: editor.IStandaloneEditorConstructionOptions | undefined;
}> = (props) => {
  return (
    <MonacoEditor
      height={props.height || "100vh"}
      width={props.width || "100%"}
      defaultValue={props.defaultValue || "// Start adding code here"}
      theme="customEditorTheme"
      language={props.language}
      value={props.value}
      line={props.line || 1}
      loading={props.loading || "Loading Code..."}
      onMount={props.onMount}
      onChange={props.onChange}
      options={props.options}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("customEditorTheme", CustomEditorTheme);
      }}
    />
  );
};

export default Editor;
