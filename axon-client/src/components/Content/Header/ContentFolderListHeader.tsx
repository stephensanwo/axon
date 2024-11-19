import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import CreateContentFolder from "../Form/CreateContentFolder";
import { ContentFolderEntity } from "src/domain/content/content.entity";
import ContentFolderListOptions from "../Form/ContentFolderListOptions";

function ContentFolderListHeader({
  title,
  contentFolders,
}: {
  title: string;
  contentFolders: ContentFolderEntity[];
}) {
  return (
    <>
      <Box className="mb-6 flex justify-between items-center h-[48px]">
        <Box className="flex flex-col h-full justify-center">
          <Text.Heading5>{title}</Text.Heading5>
          <Text.SmallSecondary
            sx={{
              fontSize: "10px",
            }}
          >
            {contentFolders.length > 0
              ? `${contentFolders.length} Folders`
              : "No Folders"}
          </Text.SmallSecondary>
        </Box>
        <Box className="h-full flex items-center gap-1">
          <ContentFolderListOptions />
          <CreateContentFolder />
        </Box>
      </Box>
    </>
  );
}

export default ContentFolderListHeader;
