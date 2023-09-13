import { useContext } from "react";
import { IMutateNote, INote, ISelectedNote } from "src/types/notes";
import FolderContext from "src/context/folder";
import { IFolderList, INoteSummary } from "src/types/folders";
import { LocalKeys } from "src/types/app";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteData, patchData, postData } from "src/api/mutate";

export const useNoteMutation = (
  noteData: IMutateNote,
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>
): {
  createNote: UseMutationResult<any, unknown, string, unknown>;
  editNote: UseMutationResult<any, unknown, string, unknown>;
  deleteNote: UseMutationResult<any, unknown, string, unknown>;
} => {
  const { folders, folderDispatch, setSelectedNote } =
    useContext(FolderContext);
  const queryClient = useQueryClient();

  const createNote = useMutation({
    mutationFn: (endpoint: string) =>
      postData(endpoint, {
        folder_id: noteData.folder_id,
        note_name: noteData.note_name,
        description: noteData.description,
      }),
    onSuccess: (result: any) => {
      //  Set local state
      folderDispatch({
        type: "NEW_NOTE",
        payload: {
          ...(result as INoteSummary),
        },
      });

      const selectedNote = result as ISelectedNote;
      localStorage.setItem(LocalKeys.SELECTED_NOTE_ID, selectedNote.note_id);
      localStorage.setItem(
        LocalKeys.SELECTED_FOLDER_ID,
        selectedNote.folder_id
      );

      const folderName = folders?.find(
        (folder: IFolderList) => folder.folder_id === selectedNote.folder_id
      )?.folder_name as string;

      setSelectedNote({
        ...selectedNote,
        folder_name: folderName,
      });

      setNoteModal(false);
      queryClient.invalidateQueries({ queryKey: ["note-detail"] });
    },
  });

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
      setNoteModal(false);
      queryClient.invalidateQueries({ queryKey: ["note-detail"] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: (endpoint: string) => deleteData(endpoint),
    onSuccess: () => {
      if (window.confirm(`Are you sure you want to delete this note?`)) {
        setNoteModal(false);
        folderDispatch({
          type: "DELETE_NOTE",
          payload: {
            note_id: noteData.note_id,
            folder_id: noteData.folder_id,
          },
        });
      }
    },
  });

  return { createNote, editNote, deleteNote };
};
