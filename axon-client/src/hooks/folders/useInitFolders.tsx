import { LocalKeys } from "src/types/app";
import { IFolderAction, IFolderList } from "src/types/folders";
import { ISelectedNote } from "src/types/notes";
import { useFolderQuery } from "./useFolderQuery";
import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

export const useInitFolders = (
  folderDispatch: React.Dispatch<IFolderAction>,
  selectedNote: ISelectedNote,
  setSelectedNote: React.Dispatch<ISelectedNote>
): { folderQuery: UseQueryResult<IFolderList[], unknown> } => {
  const { folderData, folderQuery } = useFolderQuery();

  const initFolders = () => {
    const localNoteId = localStorage.getItem(LocalKeys.SELECTED_NOTE_ID);
    const localFolderId = localStorage.getItem(LocalKeys.SELECTED_FOLDER_ID);

    if (folderData) {
      const localFolderName = folderData.filter(
        (folder) => folder.folder_id === localFolderId
      )[0]?.folder_name;

      const localNote = folderData
        .filter((folder) => folder.folder_id === localFolderId)[0]
        ?.notes?.filter((note) => note.note_id === localNoteId)[0];

      setSelectedNote({
        ...(localNote ?? ({} as ISelectedNote)),
        folder_name: localFolderName ?? folderData[0]?.folder_name,
      });

      if (folderData[0]?.notes && folderData[0]?.notes.length > 0) {
        setSelectedNote({
          ...selectedNote,
          folder_name: localFolderName ?? folderData[0]?.folder_name,
          ...(localNote ?? folderData[0]?.notes[0]),
        });
      }

      folderDispatch({
        type: "INIT_FOLDER_LIST",
        payload: folderData as IFolderList[],
      });
    }
  };

  useEffect(() => {
    initFolders();
  }, [folderData]);

  return { folderQuery };
};
