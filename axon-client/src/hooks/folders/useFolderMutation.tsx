import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { deleteData, patchData, postData } from "src/api/mutate";
import FolderContext from "src/context/folder";
import { LocalKeys } from "src/types/app";
import { IMutateFolder } from "src/types/folders";
import { useNoteEvents } from "../notes/useNoteEvents";

export const useFolderMutation = (
  folderData: IMutateFolder
): {
  createFolder: UseMutationResult<any, unknown, string, unknown>;
  editFolder: UseMutationResult<any, unknown, string, unknown>;
  deleteFolder: UseMutationResult<any, unknown, string, unknown>;
} => {
  const { folderDispatch, folderMenu, setFolderMenu } =
    useContext(FolderContext);
  const queryClient = useQueryClient();
  const { deleteCachedNote } = useNoteEvents();

  /*
  Create folder mutation
  Triggers the new_folder action
  Toggles the new folder modal
  */
  const createFolder = useMutation({
    mutationFn: (endpoint: string) =>
      postData(endpoint, { folder_name: folderData.folder_name }),

    onSuccess: (result: any) => {
      folderDispatch({
        type: "NEW_FOLDER",
        payload: {
          folder_id: result,
          folder_name: folderData.folder_name,
          date_created: "",
          last_edited: "",
          user_id: "",
          notes: [],
        },
      });

      setFolderMenu({ ...folderMenu, newFolder: false });

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

  /*
  Edit folder mutation
  Triggers the edit_folder action
  Toggles the edit folder modal
  */
  const editFolder = useMutation({
    mutationFn: (endpoint: string) => patchData(endpoint, folderData),
    onSuccess: (result) => {
      folderDispatch({
        type: "EDIT_FOLDER",
        payload: {
          folder_id: folderData.folder_id,
          folder_name: folderData.folder_name,
        },
      });

      setFolderMenu({ ...folderMenu, updateFolder: false });

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

  /*
  Delete folder mutation
  Triggers the delete_folder action
  Toggles the delete folder modal
  */
  const deleteFolder = useMutation({
    mutationFn: (endpoint: string) => deleteData(endpoint),
    onSuccess: () => {
      if (window.confirm(`Are you sure you want to delete this folder?`)) {
        setFolderMenu({ ...folderMenu, updateFolder: false });
        folderDispatch({
          type: "DELETE_FOLDER",
          payload: {
            folder_id: folderData.folder_id,
          },
        });
      }
      deleteCachedNote();

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

  return { createFolder, editFolder, deleteFolder };
};
