import { ActionList, Text, useTheme } from "@primer/react";
import { BsClockHistory } from "react-icons/bs";
import { useNoteEvents } from "src/hooks/notes/useNoteEvents";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import RecentNotesHeader from "./RecentNotesHeader";

function RecentNotes() {
  const { theme } = useTheme();
  const { folderQuery, activeNotes, selectedNote, folders, setSelectedNote } =
    useFolderContext();
  const {
    getFilteredNotes,
    deleteActiveNotes,
    deleteCachedNote,
    setCachedNote,
  } = useNoteEvents();

  const filteredNotes = getFilteredNotes(folders!!, activeNotes);

  return (
    <ActionList
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <RecentNotesHeader />
      {filteredNotes?.map((note, index) => (
        <ActionList.Item
          key={index}
          sx={{
            margin: 0,
            width: "100%",
          }}
          onClick={() => {
            setSelectedNote?.(note);
            // cacheActiveNotes(activeNotes, note.note_id); // cacheActiveNotes Not needed since the note is already in the activeNotes set
            setCachedNote(note.note_id, note.folder_id);
          }}
        >
          <ActionList.LeadingVisual>
            <BsClockHistory fill={theme?.colors.text.primary} size={12} />
          </ActionList.LeadingVisual>
          <Text
            sx={{
              fontSize: 0,
              color: theme?.colors.text.gray,
            }}
          >
            {note.note_name}
          </Text>
        </ActionList.Item>
      ))}
    </ActionList>
  );
}

export default RecentNotes;
