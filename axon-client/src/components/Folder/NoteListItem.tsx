import { SideNavMenuItem as CarbonSideNavMenuItem } from "@carbon/react";
import { useContext, useState } from "react";
import FolderContext from "src/context/folder";
import { IFolderList, INoteSummary } from "src/types/folders";
import OptionsButton from "./buttons/OptionsButton";
import styled from "styled-components";
import { useNoteEvents } from "src/hooks/notes/useNoteEvents";

const SideNavMenuItem = styled(CarbonSideNavMenuItem)`
  > a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const NoteListItem: React.FC<{
  index: number;
  folder: IFolderList;
  note: INoteSummary;
}> = (props) => {
  const {
    setSelectedNote,
    selectedNote,
    activeNotes,
    folderMenu,
    setFolderMenu,
  } = useContext(FolderContext);
  const [isHovered, setIsHovered] = useState(false);
  const { setCachedNote, cacheActiveNotes } = useNoteEvents();
  return (
    <SideNavMenuItem
      key={props.index}
      id={props.note?.note_id || ""}
      onClick={() => {
        setSelectedNote({
          ...props.note,
        });
        cacheActiveNotes(activeNotes, props.note.note_id);
        setCachedNote(props.note.note_id, props.folder.folder_id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isActive={selectedNote?.note_id === props.note.note_id}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "231px",
        }}
      >
        {props.note?.note_name.substring(0, 25) +
          `${props.note?.note_name.length > 25 ? "..." : ""}`}
        {isHovered && (
          <OptionsButton
            id="note-options-button"
            onClick={() => {
              setFolderMenu({ ...folderMenu, updateNote: true });
            }}
          />
        )}
      </div>
    </SideNavMenuItem>
  );
};
