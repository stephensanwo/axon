import { IFolderAction, IFolderList, INoteSummary } from "src/types/folders";
import { Reducer, useCallback, useMemo, useReducer } from "react";
import folderReducer from "src/reducers/folders";
import { useNoteEvents } from "../notes/useNoteEvents";

/*
Initialize folders
Get local note id and folder id from local storage
Fetch folder list and set selected note using local note id and folder id or first note in first folder if local note id and folder id are not found
*/
export const useInitFolders = (
  setSelectedNote: React.Dispatch<INoteSummary>,
  activeNotes: Set<string>,
  folderData: IFolderList[] | null
): {
  folders: IFolderList[];
  folderDispatch: React.Dispatch<IFolderAction>;
} => {
  const [folders, folderDispatch] = useReducer<
    Reducer<IFolderList[], IFolderAction>
  >(folderReducer, folderData ?? ([] as IFolderList[]));
  const { getCachedNote, setActiveNotes } = useNoteEvents();

  // Get last working local note id and folder id from _cachedNotes in local storage
  const cachedNote = getCachedNote();
  const localNoteId = Object.keys(cachedNote!!)[0] ?? null;
  const localFolderId = Object.values(cachedNote!!)[0] ?? null;

  const localNote = useMemo(() => {
    return folderData
      ?.filter((folder) => folder.folder_id === localFolderId)[0]
      ?.notes?.filter((note) => note.note_id === localNoteId)[0];
  }, [folderData]);

  const initFolders = useCallback(() => {
    if (folderData) {
      // Set selected note id and folder id to determin which note is rendered on initial load
      if (localNote) {
        // Use local note id and folder id if found
        setSelectedNote(localNote);
      }
      folderDispatch({
        type: "INIT_FOLDER_LIST",
        payload: folderData as IFolderList[],
      });
      setActiveNotes(activeNotes);
    }
  }, [folderData]);

  useMemo(() => {
    initFolders();
  }, [folderData]);

  return { folders, folderDispatch };
};
