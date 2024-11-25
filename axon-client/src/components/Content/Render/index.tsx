import { ComponentRouter } from "../Components/Components.router";
import { ContentTypeKeys } from "src/domain/content/content.entity";
import { ContentTypeDataQuery } from "src/context/content/index.types";

function ContentRender({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  const Content =
    ComponentRouter[
      contentTypeData.data?.content.content_type as ContentTypeKeys
    ];
  return (
    <div className="h-full w-full p-4">
      <Content contentTypeData={contentTypeData} />
    </div>
  );
}

export default ContentRender;
