import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchData } from "src/api/query";
import FolderContext from "src/context/folder";
import { INote } from "src/types/notes";

export const useNoteQuery = (): {
  noteData: INote | null;
  noteQuery: UseQueryResult<INote, unknown>;
} => {
  const { selectedNote } = useContext(FolderContext);

  const query = useQuery<INote>({
    queryKey: [
      `note-detail-${selectedNote?.folder_id}-${selectedNote?.note_id}`,
    ],
    queryFn: () =>
      fetchData(
        `note-detail?folder_id=${selectedNote?.folder_id}&note_id=${selectedNote?.note_id}`
      ),
  });

  return {
    noteData: query.data ?? null,
    noteQuery: query,
  };
};
