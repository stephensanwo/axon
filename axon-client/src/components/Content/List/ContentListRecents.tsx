import { Box, useTheme } from "@primer/react";
import Card from "src/components/Common/Card";
import { useContent } from "src/context/content/hooks/useContent";
import { UpdateContentDto } from "src/domain/content/content.dto";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import {
  ContentEntity,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import { useNavigate } from "react-router-dom";

function ContentListRecents({
  contentRecents,
  contentFolder,
}: {
  contentFolder: ContentFolderEntity;
  contentRecents: ContentEntity[];
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { updateContent } = useContent();
  return (
    <Box
      className="flex items-center gap-3 overflow-x-scroll mb-4 pl-3 pr-3"
      sx={{ scrollbarWidth: "none" }}
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
          onClick={() =>
            navigate(`/content/${contentFolder.name}/${content.id}`)
          }
        ></Card.Button>
      ))}
    </Box>
  );
}

export default ContentListRecents;
