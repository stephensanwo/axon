import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouter } from "../ContentRouter";
import { ContentTypeKeys } from "src/domain/content/content.entity";

function ContentView(props: BaseContentProps) {
  const Content =
    ContentRouter[
      props.contentTypeData.data?.content.content_type as ContentTypeKeys
    ];

  return (
    <Box
      sx={{
        height: "90%",
        maxWidth: "1024px",
        margin: "auto",
        marginTop: "16px",
      }}
    >
      <Content {...props} />
    </Box>
  );
}

export default ContentView;
