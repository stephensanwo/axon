import { useRef } from "react";
import { Box, IconButton } from "@primer/react";
import { Heading } from "@primer/react";
import { BsFolderPlus } from "react-icons/bs";
import { useFolderMenuContext } from "../FolderMenuContext";
import NewFolder from "../FolderDialogs/NewFolder";

function FolderTreeHeader() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { folderDialog, setFolderDialog, theme } = useFolderMenuContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 6px",
      }}
    >
      <Heading
        as="h3"
        id="folders-heading"
        sx={{ fontSize: 0, color: theme?.colors.text.gray }}
      >
        Folders
      </Heading>
      <IconButton
        ref={buttonRef}
        size="small"
        icon={BsFolderPlus}
        variant="default"
        aria-label="New Folder Button"
        onClick={() => {
          setFolderDialog("create-new-folder");
        }}
      />
      {folderDialog === "create-new-folder" && <NewFolder ref={buttonRef} />}
    </Box>
  );
}

export default FolderTreeHeader;
