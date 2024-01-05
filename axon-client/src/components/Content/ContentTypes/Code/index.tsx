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
                defaultValue="// Start adding code here"
                language={code?.language!!}
                value={code?.code!!}
                loading={"Loading Code Snippet..."}
                onChange={(value, event) => handleCodeChange(value, event)}
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
