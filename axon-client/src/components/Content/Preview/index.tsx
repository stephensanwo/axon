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
    <div className="h-full w-full bg-green-500">
      <Content contentTypeData={contentTypeData} />
    </div>
  );
}

export default ContentPreview;
