import { Box } from "@primer/react";
import UpdateContent from "./UpdateContent";
import DeleteContent from "./DeleteContent";
import { useContentStore } from "src/context/content/hooks/useContentStore";

function SelectContentOptions() {
  const { selectedContent } = useContentStore();

  return (
    <Box className="flex items-center gap-1">
      {selectedContent.length === 1 && <UpdateContent />}
      {selectedContent.length > 0 && <DeleteContent />}
    </Box>
  );
}

export default SelectContentOptions;
