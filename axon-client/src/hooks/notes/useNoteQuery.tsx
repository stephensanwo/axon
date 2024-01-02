import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchData } from "src/api/query";
import FolderContext from "src/context/folder";
import { INote } from "src/types/notes";

/*
Fetch note query

*/
export const useNoteQuery = (): {
  noteData: INote | null;
  noteQuery: UseQueryResult<INote, unknown>;
  publicNoteId: string | null;
  sharedNoteQuery: UseQueryResult<string, unknown>;
} => {
  const { selectedNote } = useContext(FolderContext);

  const query = useQuery<INote>({
    queryKey: [`note-${selectedNote?.folder_id}-${selectedNote?.note_id}`],
    queryFn: () =>
      fetchData(
        `note?folder_id=${selectedNote?.folder_id}&note_id=${selectedNote?.note_id}`
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const sharedNoteQuery = useQuery<string>({
    queryKey: [`get-shared-note?note_id=${selectedNote?.note_id}`],
    queryFn: () =>
      fetchData(`get-shared-note?note_id=${selectedNote?.note_id}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const noteData: INote | null = query.data ?? null;
  if (noteData !== null && noteData?.nodes === null) {
    noteData.nodes = [];
    noteData.edges = [];
  }
  return {
    noteData,
    noteQuery: query,
    publicNoteId: sharedNoteQuery.data ?? null,
    sharedNoteQuery,
  };
};
