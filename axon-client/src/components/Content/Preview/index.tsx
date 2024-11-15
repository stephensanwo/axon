import { Box } from "@primer/react";
import { ContentRouter } from "../ContentRouter";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import { ContentTypeDataQuery } from "src/context/content/index.types";

function ContentPreview({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  const Content =
    ContentRouter[
      contentTypeData.data?.content.content_type as ContentTypeKeys
    ];

  return (
    <Box className="h-full w-full">
      <Content contentTypeData={contentTypeData} />
    </Box>
  );
}

export default ContentPreview;
