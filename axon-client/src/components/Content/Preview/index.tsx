import { ContentTypeDataQuery } from "src/context/content/index.types";
import { ContentViewMain } from "../View/ContentViewMain";

function ContentPreview({
  contentTypeData,
}: {
  contentTypeData: ContentTypeDataQuery;
}) {
  return <ContentViewMain contentTypeData={contentTypeData} />;
}

export default ContentPreview;
