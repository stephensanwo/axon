import ContentListNav from "../List/ContentListNav";
import { Text } from "src/components/Common/Text";
import ContentViewNav from "../View/ContentViewNav";
import {
  ContentListQuery,
  ContentTypeDataQuery,
} from "src/context/content/index.types";

type ContentNavProps = {
  level: "list" | "content" | "index";
  contentList?: ContentListQuery;
  contentTypeData?: ContentTypeDataQuery;
};

function ContentNav({ level, contentTypeData, contentList }: ContentNavProps) {
  if (level === "content" && (!contentTypeData || !contentList)) {
    console.error(
      "contentTypeData and contentList must be passed for nav level 'content'"
    );
  }

  if (level === "list" && !contentList) {
    console.error("contentList must be passed for nav level 'list'");
  }

  const contentNavTitle = `${contentTypeData?.isLoading ? "..." : contentTypeData?.isError || !contentTypeData?.data ? "Error" : contentTypeData?.data?.parent_content.name}`;

  const listTitle = `${contentList?.isLoading ? "..." : contentList?.isError || !contentList?.data ? "Error" : contentList?.data?.folder.name}`;

  return (
    <>
      <ContentListNav
        navTitle={"Content"}
        level={level}
        listTitle={listTitle}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "content" && <ContentViewNav navTitle={contentNavTitle} />}
    </>
  );
}

export default ContentNav;
