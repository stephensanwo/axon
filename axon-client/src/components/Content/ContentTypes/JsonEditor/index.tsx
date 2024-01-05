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
          defaultValue="{}"
          language={"json"}
          value={json?.code!!}
          loading={"Loading JSON..."}
          onChange={(value, event) => handleJsonUpdate(value, event)}
          overrideOptions={{
            folding: true,
          }}
          // Add JSON linting
          onMount={(editor) => {
            languages.json.jsonDefaults.setDiagnosticsOptions({
              validate: true,
              schemas: [], // Schemas for validation
            });
          }}
        />
      </ContentBody>
    </ContentContainer>
  );
};

export default JsonEditor;
