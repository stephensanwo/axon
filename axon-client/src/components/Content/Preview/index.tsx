import { Box } from "@primer/react";
import { BaseContentProps } from "../index.types";
import { ContentRouter } from "../ContentRouter";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import ContentSkeleton from "../ContentSkeleton";
function ContentPreview(props: BaseContentProps) {
  console.log("content preview", props);
  if (props.contentTypeData.isLoading) {
    return <ContentSkeleton />;
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
