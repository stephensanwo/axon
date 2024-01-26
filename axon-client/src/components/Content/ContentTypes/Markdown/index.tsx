import { PiCodeLight } from "react-icons/pi";
import { BsFillMarkdownFill } from "react-icons/bs";
import {
  ContentBody,
  ContentContainer,
} from "src/components/Content/ContentTypes/Shared/styles";
import Tabs from "src/components/Content/ContentTypes/Shared/Tabs";
import {
  AxonMarkdownInput,
  AxonMarkdownPreview,
} from "src/components/Markdown";

const Markdown = () => {
  return (
    <ContentContainer id="node-content-container">
      <ContentBody>
        <Tabs
          name="Markdown"
          headers={[
            {
              label: "Edit Markdown",
              icon: <PiCodeLight size={18} />,
            },
            {
              label: "Preview Markdown",
              icon: <BsFillMarkdownFill size={18} />,
            },
          ]}
          content={[<AxonMarkdownInput />, <AxonMarkdownPreview />]}
        ></Tabs>
      </ContentBody>
    </ContentContainer>
  );
};

export default Markdown;
