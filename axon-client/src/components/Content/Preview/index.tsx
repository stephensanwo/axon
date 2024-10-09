import { Box } from "@primer/react";
import { ContentRouter, ContentRouterProps } from "../index.types";
import { ContentRouterComponent } from "../ContentRouter";
import { ContentTypeKeys } from "src/domain/content/content.entity";

function ContentPreview(props: ContentRouterProps) {
  const content_type = props.previewContent.content_type;
  console.log("content_type", props.previewContent);
  const Content = ContentRouter[content_type as ContentTypeKeys];
  return (
    <Box
      sx={{
        height: "80%",
      }}
    >
      <Content {...props} viewType="preview" />;
    </Box>
  );
}

export default ContentPreview;
