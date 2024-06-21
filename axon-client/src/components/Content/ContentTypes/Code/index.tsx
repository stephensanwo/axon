import { PiCodeSimpleLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { upperFirst } from "lodash";
import { useCode } from "src/hooks/content/useCode";
import {
  ContentBody,
  ContentContainer,
} from "src/components/Content/index.styles";
import Tabs from "src/components/Tabs";
import Editor from "src/components/CodeEditor/Editor";
import Settings from "./Settings";

const Code = () => {
  const { code, handleCodeChange } = useCode();
  return (
    <ContentContainer id="node-content-container">
      <ContentBody>
        <Tabs
          name="Code"
          headers={[
            {
              label: upperFirst(code?.language!!),
              icon: <PiCodeSimpleLight size={18} />,
            },
            {
              label: "Settings",
              icon: <CiSettings size={18} />,
            },
          ]}
          content={[
            <Editor
              defaultValue="// Start adding code here"
              language={code?.language!!}
              value={code?.code!!}
              loading={"Loading Code Snippet..."}
              onChange={(value, event) => handleCodeChange(value, event)}
            />,
            <Settings />,
          ]}
        />
      </ContentBody>
    </ContentContainer>
  );
};

export default Code;
