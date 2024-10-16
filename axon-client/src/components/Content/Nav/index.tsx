import { BaseContentProps } from "../index.types";
import ContentListNav from "./ContentListNav";
import { Text } from "src/components/Common/Text";
import ContentViewNav from "./ContentViewNav";

function ContentNav({
  level,
  contentList,
  contentTypeData,
}: {
  level: "list" | "content";
} & BaseContentProps) {
  const contentNavTitle = `${contentTypeData.isLoading ? "..." : contentTypeData.data?.parent_content.name}`;

  return (
    <>
      <ContentListNav
        navTitle={"Content"}
        contentList={contentList}
        contentTypeData={contentTypeData}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "content" && (
        <ContentViewNav
          navTitle={contentNavTitle}
          contentList={contentList}
          contentTypeData={contentTypeData}
        />
      )}
    </>
  );
}

export default ContentNav;
