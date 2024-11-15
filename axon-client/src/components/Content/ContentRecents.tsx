import { Box, useTheme } from "@primer/react";
import Card from "src/components/Common/Card";
import { useContent } from "src/context/content/hooks/useContent";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { ContentEntity } from "src/domain/content/content.entity";
import { useNavigate } from "react-router-dom";

function ContentRecents({
  contentRecents,
}: {
  contentRecents: ContentEntity[];
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { updateContent } = useContent();
  return (
    <Box
      sx={{
        height: "140px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "scroll",
        scrollbarWidth: "none",
      }}
      className="mb-3 pt-2 pl-3 pr-3"
    >
      {contentRecents?.map((content, index) => (
        <Card.Button
          key={index}
          icon={
            <BsFillFileEarmarkTextFill
              size={48}
              color={theme?.colors.primary.default}
            />
          }
          title={content.name}
          border
          trailingAction={() => {
            const dto: UpdateContentDto = {
              ...content,
              pinned: false,
            };
            updateContent.mutate(dto);
          }}
          onClick={() => navigate(`/content/${content.id}`)}
        ></Card.Button>
      ))}
    </Box>
  );
}

export default ContentRecents;
