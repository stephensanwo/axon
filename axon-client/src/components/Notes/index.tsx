import { Text, TreeView, useTheme } from "@primer/react";
import { DotFillIcon } from "@primer/octicons-react";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { useNoteEvents } from "src/hooks/notes/useNoteEvents";
import { INoteSummary } from "src/types/folders";

function Notes(note: INoteSummary) {
  const { note_id, note_name, folder_id } = note;
  const { setSelectedNote, selectedNote, activeNotes } = useFolderContext();
  const { setCachedNote, cacheActiveNotes } = useNoteEvents();
  const { theme } = useTheme();
  return (
    <TreeView.Item
      id={note_id}
      onSelect={() => {
        setSelectedNote({
          ...note,
        });
        cacheActiveNotes(activeNotes, note_id);
        setCachedNote(note_id, folder_id);
      }}
      current={selectedNote?.note_id === note_id}
    >
      {selectedNote?.note_id === note_id && (
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
        {note_name}
      </Text>
    </TreeView.Item>
  );
}

export default Notes;
