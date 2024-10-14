import { Box, useTheme } from "@primer/react";
import { formatDateToRelativeTime } from "src/common/date";
import Card from "src/components/Common/Card";
import { useContent } from "src/context/content/hooks/useContent";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { ContentEntity } from "src/domain/content/content.entity";

function ContentRecents({
  contentRecents,
}: {
  contentRecents: ContentEntity[];
}) {
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
      {contentRecents?.map((content, index) => (
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
