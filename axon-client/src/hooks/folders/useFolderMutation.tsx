import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { deleteData, patchData, postData } from "src/api/mutate";
import FolderContext from "src/context/folder";
import { IMutateFolder } from "src/types/folders";

export const useFolderMutation = (
  folderData: IMutateFolder,
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>
): {
  createFolder: UseMutationResult<any, unknown, string, unknown>;
  editFolder: UseMutationResult<any, unknown, string, unknown>;
  deleteFolder: UseMutationResult<any, unknown, string, unknown>;
} => {
  const { folderDispatch } = useContext(FolderContext);
  const queryClient = useQueryClient();

  const createFolder = useMutation({
    mutationFn: (endpoint: string) =>
      postData(endpoint, { folder_name: folderData.folder_name }),

    onSuccess: (result: any) => {
      //  Set local state
      folderDispatch({
        type: "NEW_FOLDER",
        payload: {
          folder_id: result?.data,
          folder_name: folderData.folder_name,
        },
      });
      setFolderModal(false);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

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
      setFolderModal(false);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

  const deleteFolder = useMutation({
    mutationFn: (endpoint: string) => deleteData(endpoint),
    onSuccess: () => {
      if (window.confirm(`Are you sure you want to delete this folder?`)) {
        setFolderModal(false);
        folderDispatch({
          type: "DELETE_FOLDER",
          payload: {
            folder_id: folderData.folder_id,
          },
        });
      }
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["folder"] });
    },
  });

  return { createFolder, editFolder, deleteFolder };
};
