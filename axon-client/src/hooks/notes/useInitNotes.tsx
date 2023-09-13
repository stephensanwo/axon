import { useContext, useEffect } from "react";
import NoteContext from "src/context/notes";
import { useNoteQuery } from "./useNoteQuery";
import { INote } from "src/types/notes";
import { UseQueryResult } from "@tanstack/react-query";

export const useInitNotes = (): {
  noteData: INote | null;
  noteQuery: UseQueryResult<INote, unknown>;
} => {
  const { noteDispatch } = useContext(NoteContext);
  const { noteData, noteQuery } = useNoteQuery();

  const initNote = () => {
    noteDispatch({
      type: "INIT_NOTE",
      payload: noteData ?? ({} as INote),
    });
  };

  useEffect(() => {
    initNote();
  }, [noteData]);

  return { noteData, noteQuery };
};
