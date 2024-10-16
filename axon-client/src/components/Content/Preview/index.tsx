import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouter } from "../ContentRouter";
import { ContentTypeKeys } from "src/domain/content/content.entity";

function ContentPreview(props: BaseContentProps) {
  console.log("content preview", props);
  if (props.contentTypeData.isLoading) {
    return <h1>Loading...</h1>;
  }
  const Content =
    ContentRouter[
      props.contentTypeData.data?.content.content_type as ContentTypeKeys
    ];
  return (
    <Box
      sx={{
        height: "80%",
      }}
    >
      <Content {...props} />
    </Box>
  );
}

export default ContentPreview;
