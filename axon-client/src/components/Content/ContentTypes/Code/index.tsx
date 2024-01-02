import { useCode } from "src/hooks/content/useCode";
import { ContentBody, ContentContainer } from "../Shared/styles";
import Tabs from "../Shared/Tabs";
import { PiCodeSimpleBold, PiCodeBold } from "react-icons/pi";
import { TbSettingsCode } from "react-icons/tb";
import Editor from "src/components/CodeEditor/Editor";
import Settings from "./Settings";
import { TagButton } from "src/components/Button/TagButton";
import { ThemeColors } from "src/shared/themes";
import { upperFirst } from "lodash";
const Code = () => {
  const { code, handleCodeChange } = useCode();
  return (
    <ContentContainer id="node-content-container">
      <ContentBody>
        <Tabs
          children={{
            header: [
              {
                label: "Editor",
                icon: (
                  <TagButton
                    id="editor-language"
                    label={upperFirst(code?.language!!)}
                    style={{
                      color: ThemeColors.primary,
                    }}
                  />
                ),
              },

              {
                label: "Settings",
                icon: <TbSettingsCode size={18} />,
              },
            ],
            content: [
              <Editor
                height="100vh"
                width="100%"
                defaultValue="// Start adding code here"
                theme="vs-dark"
                language={code?.language!!}
                value={code?.code!!}
                line={0}
                loading={"Loading Code..."}
                onMount={(editor) => {}}
                onChange={(value, event) => handleCodeChange(value, event)}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  fontFamily: "IBM Plex Mono",
                  fontSize: 14,
                  tabSize: 8,
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
                  "semanticHighlighting.enabled": false,
                  suggest: {
                    preview: false,
                    showFiles: false,
                    showMethods: false,
                    showFunctions: false,
                    showConstructors: false,
                    showVariables: false,
                    showProperties: false,
                    showEvents: false,
                    showOperators: false,
                    showKeywords: false,
                    showWords: false,
                    showColors: false,
                    showModules: false,
                    showClasses: false,
                    showInterfaces: false,
                    showStructs: false,
                    showEnums: false,
                    showEnumMembers: false,
                    showConstants: false,
                    showReferences: false,
                    showFolders: false,
                    showTypeParameters: false,
                    showIssues: false,
                    showUsers: false,
                    showSnippets: false,
                    showDeprecated: false,
                    filterGraceful: false,
                    snippetsPreventQuickSuggestions: true,
                  },
                  scrollbar: {
                    vertical: "visible",
                    horizontal: "hidden",
                  },
                }}
              />,
              <Settings />,
            ],
          }}
        />
      </ContentBody>
    </ContentContainer>
  );
};

export default Code;
