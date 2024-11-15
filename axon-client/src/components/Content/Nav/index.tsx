import ContentListNav from "./ContentListNav";
import { Text } from "src/components/Common/Text";
import ContentViewNav from "./ContentViewNav";
import { ContentTypeDataQuery } from "src/context/content/index.types";

type ContentNavProps =
  | {
      level: "list";
      contentTypeData?: ContentTypeDataQuery;
    }
  | {
      level: "content";
      contentTypeData: ContentTypeDataQuery;
    };

function ContentNav({ level, contentTypeData }: ContentNavProps) {
  const contentNavTitle = `${contentTypeData?.isLoading ? "..." : contentTypeData?.data?.parent_content.name}`;

  return (
    <>
      <ContentListNav navTitle={"Content"} />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "content" && <ContentViewNav navTitle={contentNavTitle} />}
    </>
  );
}

export default ContentNav;
