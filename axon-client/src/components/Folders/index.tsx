import React, { useEffect, useState } from "react";
import { Box } from "@primer/react";
import FolderTree from "src/components/Folders/FolderTree";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import RecentNotes from "src/components/RecentNotes";
import { Divider } from "src/components/Divider";
import { FolderTreeContainer } from "./index.styles";
import FolderMenuContext from "./FolderMenuContext";
import FolderTreeHeader from "./FolderTree/FolderTreeHeader";
import {
  CurrentFolderProps,
  FolderDialogProps,
  FolderProps,
} from "./index.types";

function Folders({ folders, theme }: FolderProps) {
  const { selectedNote } = useFolderContext();
  const [isCurrentFolder, setIsCurrentFolder] = useState<CurrentFolderProps>();
  const [folderDialog, setFolderDialog] = useState<FolderDialogProps>(null);

  useEffect(() => {
    setIsCurrentFolder(() => selectedNote?.folder_id);
  }, []);

  return (
    <FolderMenuContext.Provider
      value={{
        theme,
        isCurrentFolder,
        setIsCurrentFolder,
        folderDialog,
        setFolderDialog,
      }}
    >
      <FolderTreeContainer aria-label="Folder Tree" id="axon-folder-tree">
        <RecentNotes />
        <Divider margin={36} />
        <Box>
          <FolderTreeHeader />
          <Box
            sx={{
              height: "100%",
              overflowY: "scroll",
            }}
          >
            {folders?.map((folder, index) => (
              <FolderTree folder={folder} key={index} />
            ))}
          </Box>
        </Box>
      </FolderTreeContainer>
    </FolderMenuContext.Provider>
  );
}

export default React.memo(Folders);
