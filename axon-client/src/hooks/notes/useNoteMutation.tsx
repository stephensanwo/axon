import { useContext } from "react";
import { IMutateNote } from "src/types/notes";
import FolderContext from "src/context/folder";
import { INoteSummary } from "src/types/folders";
import { LocalKeys } from "src/types/app";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteData, patchData, postData } from "src/api/mutate";
import { ulid } from "ulid";
import NoteContext from "src/context/notes";
import { useNoteEvents } from "./useNoteEvents";

export const useNoteMutation = (
  noteData: IMutateNote
): {
  createNote: UseMutationResult<any, unknown, string, unknown>;
  editNote: UseMutationResult<any, unknown, string, unknown>;
  deleteNote: UseMutationResult<any, unknown, string, unknown>;
  publishPublicNote: UseMutationResult<any, unknown, string, unknown>;
} => {
  const {
    folders,
    folderDispatch,
    setSelectedNote,
    activeNotes,
    folderMenu,
    setFolderMenu,
  } = useContext(FolderContext);
  const { setPublicId } = useContext(NoteContext);
  const {
    setCachedNote,
    deleteCachedNote,
    cacheActiveNotes,
    deleteActiveNotes,
  } = useNoteEvents();
  const queryClient = useQueryClient();
  console.log("Use Node Mutation");
  /*
  Create note mutation
  Triggers the new_note action
  Sets the selected note in the local storage
  Adds the note id to the active notes
  Toggles the new note modal
  */
  const createNote = useMutation({
    mutationFn: (endpoint: string) =>
      postData(endpoint, {
        folder_id: noteData.folder_id,
        note_name: noteData.note_name,
        description: noteData.description,
      }),
    onSuccess: (result: any) => {
      folderDispatch({
        type: "NEW_NOTE",
        payload: {
          ...(result as INoteSummary),
        },
      });

      const selectedNote = result as INoteSummary;
      setSelectedNote({
        ...selectedNote,
      });
      setCachedNote(selectedNote.note_id, selectedNote.folder_id);
      cacheActiveNotes(activeNotes, selectedNote.note_id);
      setFolderMenu({ ...folderMenu, newNote: false });

      queryClient.invalidateQueries({ queryKey: ["note-detail"] });
    },
  });

  /*
  Edit note mutation
  Triggers the edit_note action
  Toggles the edit note modal
  */
  const editNote = useMutation({
    mutationFn: (endpoint: string) => patchData(endpoint, noteData),
    onSuccess: () => {
      folderDispatch({
        type: "EDIT_NOTE",
        payload: {
          folder_id: noteData.folder_id,
          note_id: noteData.note_id,
          note_name: noteData.note_name,
          description: noteData.description,
        },
      });
      setFolderMenu({ ...folderMenu, updateNote: false });

      queryClient.invalidateQueries({ queryKey: ["note-detail"] });
    },
  });

  /*
  Delete note mutation
  Triggers the delete_note action
  Removes the note id from the active notes
  Toggles the delete note modal
  TODO: Handles the deletion of a note from the local state
  */
  const deleteNote = useMutation({
    mutationFn: (endpoint: string) => deleteData(endpoint),
    onSuccess: () => {
      if (window.confirm(`Are you sure you want to delete this note?`)) {
        folderDispatch({
          type: "DELETE_NOTE",
          payload: {
            note_id: noteData.note_id,
            folder_id: noteData.folder_id,
          },
        });
        deleteActiveNotes(activeNotes, noteData.note_id);
        deleteCachedNote();
        setSelectedNote(null);
        setFolderMenu({ ...folderMenu, updateNote: false });
      }
    },
  });

  const publishPublicNote = useMutation({
    mutationFn: (endpoint: string) => {
      return postData(endpoint, {
        folder_id: noteData.folder_id,
        note_id: noteData.note_id,
        public_note_id: ulid(),
      });
    },
    onSuccess: (result: any) => {
      setPublicId(() => result ?? null);
    },
    onError: (error) => {},
  });

  return {
    createNote,
    editNote,
    deleteNote,
    publishPublicNote,
  };
};
