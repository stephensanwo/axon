import { languages } from "monaco-editor";
import Editor from "src/components/CodeEditor/Editor";
import { useJson } from "src/hooks/content/useJson";
import { ContentBody, ContentContainer } from "../Shared/styles";

const JsonEditor = () => {
  const { json, handleJsonUpdate } = useJson();

  return (
    <ContentContainer id="node-content-container">
      <ContentBody>
        <Editor
          height="100vh"
          width="100%"
          defaultValue="{}"
          theme="vs-dark"
          language={"json"}
          value={json?.code!!}
          line={0}
          loading={"Loading JSON..."}
          onChange={(value, event) => handleJsonUpdate(value, event)}
          options={{
            minimap: {
              enabled: false,
            },
            fontFamily: "IBM Plex Mono",
            fontSize: 14,
            tabSize: 8,
            extraEditorClassName: "json-editor",
            padding: {
              top: 14,
            },
            detectIndentation: true,
            readOnly: false,
            autoIndent: "advanced",
            bracketPairColorization: {
              enabled: true,
            },
            scrollBeyondLastLine: true,
            lineNumbers: "on",
            wordWrap: "on",
            wrappingIndent: "indent",
            wrappingStrategy: "advanced",
            renderLineHighlight: "all",
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: false,
            renderLineHighlightOnlyWhenFocus: false,
            renderValidationDecorations: "off", // Turn off validation errors
            renderWhitespace: "all",
            selectionHighlight: false,
            "semanticHighlighting.enabled": true,

            // Formatting
            formatOnType: true,
            formatOnPaste: true,

            // Disable suggestions/intellisense
            quickSuggestions: true,
            folding: true,
          }}
          // Add JSON linting
          onMount={(editor) => {
            languages.json.jsonDefaults.setDiagnosticsOptions({
              validate: true,
              schemas: [], // Schemas for validation
            });
          }}
        />{" "}
      </ContentBody>
    </ContentContainer>
  );
};

export default JsonEditor;
