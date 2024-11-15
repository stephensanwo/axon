import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import CreateContent from "../Form/CreateContent";
import SelectContentOptions from "../Form/SelectContentOptions";
import SearchContent from "../Form/SearchContent";
import {
  ContentEntity,
  ContentFolderEntity,
} from "src/domain/content/content.entity";
import PinFolder from "../Form/PinFolder";
import ContentFolderOptions from "../Form/ContentFolderOptions";
import { Hidden } from "@primer/react/drafts";

function ContentListHeader({
  title,
  contentList,
  contentListFolder,
}: {
  title: string;
  contentList: ContentEntity[];
  contentListFolder: ContentFolderEntity;
}) {
  return (
    <>
      <Box className="px-3 mt-2">
        <Box className="mb-2">
          <Text.Heading5>{title}</Text.Heading5>
          <Text.SmallSecondary
            sx={{
              fontSize: "10px",
            }}
          >
            {contentList.length > 0
              ? `${contentList.length} Files`
              : "No Files"}
          </Text.SmallSecondary>
        </Box>
        <Box className="flex items-center gap-1">
          <Box className="flex-grow">
            <SearchContent />
          </Box>
          <ContentFolderOptions contentFolder={contentListFolder} />
          <PinFolder contentFolder={contentListFolder} />
          <CreateContent contentListFolder={contentListFolder} />
          <SelectContentOptions />
        </Box>
      </Box>
    </>
  );
}

export default ContentListHeader;
