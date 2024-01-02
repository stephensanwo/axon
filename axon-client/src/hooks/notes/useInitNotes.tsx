import { Reducer, useCallback, useContext, useEffect, useReducer } from "react";
import { INote, INoteAction } from "src/types/notes";
import { IEdge } from "src/types/edge";
import { INode } from "src/types/node";
import noteReducer from "src/reducers/notes";
import FolderContext from "src/context/folder";

/*
  Initialize note
  Fetch note data and set nodes and edges  
*/
export const useInitNotes = (
  noteData: INote | null,
  setNodes: any,
  setEdges: any,
  publicNoteId?: string | null,
  setPublicId?: React.Dispatch<React.SetStateAction<string | null>>
): {
  note: INote;
  noteDispatch: React.Dispatch<INoteAction>;
} => {
  const [note, noteDispatch] = useReducer<Reducer<INote, INoteAction>>(
    noteReducer,
    noteData ?? ({} as INote)
  );

  const { selectedNote } = useContext(FolderContext);
  const initNote = useCallback(() => {
    noteDispatch({
      type: "INIT_NOTE",
      payload: noteData ?? ({} as INote),
    });
  }, [noteData, selectedNote]);

  useEffect(() => {
    initNote();
    setNodes(noteData?.nodes ?? ([] as INode[]));
    setEdges(noteData?.edges ?? ([] as IEdge[]));
    setPublicId && setPublicId(publicNoteId ?? null);
  }, [noteData, selectedNote]);

  return { note, noteDispatch };
};
