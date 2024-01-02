import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchData } from "src/api/query";
import { INote } from "src/types/notes";

/*
Fetch public note query

*/
export const usePublicNoteQuery = (
  public_note_id: string
): {
  noteData: INote | null;
  noteQuery: UseQueryResult<INote, unknown>;
} => {
  const noteQuery = useQuery<INote>({
    queryKey: [`get-public-note?public_note_id=${public_note_id}`],
    queryFn: () =>
      fetchData(`get-public-note?public_note_id=${public_note_id}`),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    noteData: noteQuery.data ?? null,
    noteQuery,
  };
};
