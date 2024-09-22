import { BaseContentProps } from "../index.types";
import ContentListNav from "./ContentListNav";
import { Text } from "src/components/Common/Text";
import ContentViewNav from "./ContentViewNav";

function ContentNav({
  level,
  isLoading,
  contentState,
  contentStateDispatch,
}: {
  level: "list" | "content";
  isLoading: boolean;
} & BaseContentProps) {
  const contentNavTitle = `${isLoading ? "..." : contentState.content.data?.name}`;

  return (
    <>
      <ContentListNav
        navTitle={"Content"}
        contentState={contentState}
        contentStateDispatch={contentStateDispatch}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "content" && (
        <ContentViewNav
          navTitle={contentNavTitle}
          contentState={contentState}
          contentStateDispatch={contentStateDispatch}
        />
      )}
    </>
  );
}

export default ContentNav;
