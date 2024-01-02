import { ContentBody, ContentContainer } from "../Shared/styles";
import Tabs from "../Shared/Tabs";
import { PiCodeBold } from "react-icons/pi";
import { BsFillMarkdownFill } from "react-icons/bs";
import {
  AxonMarkdownInput,
  AxonMarkdownPreview,
} from "src/components/Markdown";

const Markdown = () => {
  return (
    <ContentContainer id="node-content-container">
      <ContentBody>
        <Tabs
          children={{
            header: [
              {
                label: "Edit Markdown",
                icon: <PiCodeBold size={18} />,
              },
              {
                label: "Preview Markdown",
                icon: <BsFillMarkdownFill size={18} />,
              },
            ],
            content: [<AxonMarkdownInput />, <AxonMarkdownPreview />],
          }}
        />
      </ContentBody>
    </ContentContainer>
  );
};

export default Markdown;
