import { Box } from "@primer/react";
import UpdateContent from "./UpdateContent";
import DeleteContent from "./DeleteContent";
import { useContentStore } from "src/context/content/content.store";

function SelectContentOptions() {
  const { selectedContent } = useContentStore();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {selectedContent.length === 1 && <UpdateContent />}
      {selectedContent.length > 0 && <DeleteContent />}
    </Box>
  );
}

export default SelectContentOptions;
