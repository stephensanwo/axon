import { BaseContentProps } from "../index.types";
import ContentListNav from "./ContentListNav";
import { Text } from "src/components/Common/Text";
import ContentViewNav from "./ContentViewNav";

function ContentNav({
  level,
  contentList,
  content,
}: {
  level: "list" | "content";
} & BaseContentProps) {
  const contentNavTitle = `${content.isLoading ? "..." : content.data?.name}`;

  return (
    <>
      <ContentListNav
        navTitle={"Content"}
        contentList={contentList}
        content={content}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "content" && (
        <ContentViewNav
          navTitle={contentNavTitle}
          contentList={contentList}
          content={content}
        />
      )}
    </>
  );
}

export default ContentNav;
