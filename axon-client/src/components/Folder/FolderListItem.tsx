import { SideNavMenu as CarbonSideNavMenu } from "@carbon/react";
import OptionsButton from "./buttons/OptionsButton";
import { IFolderList } from "src/types/folders";
import { useContext, useEffect, useRef, useState } from "react";
import FolderContext from "src/context/folder";
import { NoteListItem } from "./NoteListItem";
import styled from "styled-components";
import NewNoteButton from "./buttons/NewNoteButton";

const SideNavMenu = styled(CarbonSideNavMenu)``;

const FolderListItem: React.FC<{
  index: number;
  folder: IFolderList;
}> = ({ index, folder }) => {
  const { folderMenu, setFolderMenu, setSelectedFolder, selectedNote } =
    useContext(FolderContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sideNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sideNavElement = sideNavRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    if (sideNavElement) {
      sideNavElement.addEventListener("mouseenter", handleMouseEnter);
      sideNavElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        sideNavElement.removeEventListener("mouseenter", handleMouseEnter);
        sideNavElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [sideNavRef, setIsHovered]);

  return (
    <SideNavMenu
      ref={sideNavRef}
      key={index}
      id={folder.folder_id}
      renderIcon={() =>
        isHovered && (
          <OptionsButton
            id="folder-options-button"
            onClick={() => {
              setSelectedFolder(folder);
              setFolderMenu({
                ...folderMenu,
                updateFolder: true,
              });
            }}
          />
        )
      }
      title={folder.folder_name}
      isActive={selectedNote?.folder_id === folder.folder_id}
    >
      <NewNoteButton folder={folder} />
      {folder.notes?.length > 0 &&
        folder.notes?.map((note, index) => (
          <NoteListItem key={index} index={index} folder={folder} note={note} />
        ))}
    </SideNavMenu>
  );
};

export default FolderListItem;
