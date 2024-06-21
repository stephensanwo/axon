import { useContext } from "react";
import NoteContext from "src/context/notes";

export function useNoteContext() {
  return useContext(NoteContext);
}
