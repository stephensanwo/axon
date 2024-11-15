import { useRef } from "react";
import { IconButton, Text, TreeView } from "@primer/react";
import { DotFillIcon } from "@primer/octicons-react";
import { CgMoreO, CgAddR } from "react-icons/cg";
import Notes from "src/components/Notes";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { useFolderMenuContext } from "../FolderMenuContext";
import EditFolder from "../FolderDialogs/EditFolder";
import NewNote from "../FolderDialogs/NewNote";
import { FolderTreeProps } from "../index.types";

function FolderTree({ folder }: FolderTreeProps) {
  const { folder_id, folder_name, notes } = folder;
  const { selectedNote } = useFolderContext();
  const {
    isCurrentFolder,
    setIsCurrentFolder,
    folderDialog,
    setFolderDialog,
    theme,
  } = useFolderMenuContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <TreeView aria-label="Folders">
        <TreeView.Item
          id={folder_id}
          onSelect={() => {
            setIsCurrentFolder(() => folder_id);
          }}
          current={isCurrentFolder === folder_id}
          containIntrinsicSize="auto"
        >
          {selectedNote?.folder_id === folder_id && (
            <TreeView.LeadingVisual>
              <DotFillIcon size={10} fill={theme?.colors.text.primary} />
            </TreeView.LeadingVisual>
          )}
          <Text
            sx={{
              fontSize: 0,
              color: theme?.colors.text.gray,
            }}
          >
            {folder_name}
          </Text>
          <TreeView.SubTree>
            {notes?.map((note, index) => (
              <Notes {...note} key={index} />
            ))}
          </TreeView.SubTree>
          {isCurrentFolder === folder_id && (
            <TreeView.TrailingVisual>
              <IconButton
                ref={buttonRef}
                icon={CgAddR}
                variant="invisible"
                aria-label="New Note Button"
                onClick={() => {
                  setFolderDialog(`${folder_id}-new-note`);
                }}
                size="small"
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                    color: theme?.colors.text.primary,
                  },
                }}
              />
              <IconButton
                ref={buttonRef}
                icon={CgMoreO}
                variant="invisible"
                aria-label="Folder Options Button"
                onClick={() => {
                  setFolderDialog(`${folder_id}-edit`);
                }}
                size="small"
                sx={{
                  ":hover": {
                    backgroundColor: "transparent",
                    color: theme?.colors.text.primary,
                  },
                }}
              />
            </TreeView.TrailingVisual>
          )}
        </TreeView.Item>
      </TreeView>
      {folderDialog === `${folder_id}-edit` && (
        <EditFolder ref={buttonRef} {...folder} />
      )}
      {folderDialog === `${folder_id}-new-note` && (
        <NewNote ref={buttonRef} {...folder} />
      )}
    </>
  );
}

export default FolderTree;
