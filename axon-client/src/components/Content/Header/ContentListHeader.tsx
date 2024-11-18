import { Box } from "@primer/react";
import { Text } from "../../Common/Text";
import CreateContent from "../Form/CreateContent";
import SelectContentOptions from "../Form/SelectContentOptions";
import SearchContent from "../Form/SearchContent";
import { ContentFolderEntity } from "src/domain/content/content.entity";
import PinFolder from "../Form/PinFolder";
import ContentFolderOptions from "../Form/ContentFolderOptions";

function ContentListHeader({
  title,
  contentListFolder,
}: {
  title: string;
  contentListFolder: ContentFolderEntity;
}) {
  return (
    <>
      <Box className="pl-3 pr-2 mt-2">
        <Box className="mb-2">
          <Text.Heading5>{title}</Text.Heading5>
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
