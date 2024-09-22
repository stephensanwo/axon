import { Box, useTheme } from "@primer/react";
import { formatDateToRelativeTime } from "src/common/date";
import Card from "src/components/Common/Card";
import { BaseContentProps } from "./index.types";
import { useContent } from "src/context/content/hooks/useContent";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

function ContentRecents({ contentState }: BaseContentProps) {
  const { theme } = useTheme();
  const { updateContent } = useContent();
  return (
    <Box
      sx={{
        height: "150px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "scroll",
        scrollbarWidth: "none",
        mb: 4,
      }}
    >
      {contentState?.contentList.pinnedContent?.map((content, index) => (
        <Card.Button
          key={index}
          icon={
            <BsFillFileEarmarkTextFill
              size={64}
              color={theme?.colors.primary.default}
            />
          }
          title={content.name}
          subtitle={formatDateToRelativeTime(content.updated)}
          border
          trailingAction={() => {
            // Unpin content
            const dto: UpdateContentDto = {
              ...content,
              pinned: false,
            };
            updateContent.mutate(dto);
          }}
          onClick={() => console.log("click")}
        ></Card.Button>
      ))}
    </Box>
  );
}

export default ContentRecents;
