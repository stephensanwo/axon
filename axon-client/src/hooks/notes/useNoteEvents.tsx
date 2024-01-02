import { useCallback } from "react";
import { LocalKeys } from "src/types/app";
import { IFolderList, INoteSummary } from "src/types/folders";

export const useNoteEvents = (): {
  getFilteredNotes: (
    folders: IFolderList[],
    activeNotes: Set<string>
  ) => INoteSummary[];
  setCachedNote: (note_id: string, folder_id: string) => void;
  getCachedNote: () => Record<string, string> | null;
  deleteCachedNote: () => void;
  cacheActiveNotes: (activeNotes: Set<string>, note_id: string) => void;
  setActiveNotes: (activeNotes: Set<string>) => void;
  deleteActiveNotes: (activeNotes: Set<string>, note_id: string) => void;
} => {
  const getFilteredNotes = (
    folders: IFolderList[],
    activeNotes: Set<string>
  ) => {
    return folders?.flatMap((folder) =>
      folder.notes?.filter((note) => activeNotes.has(note.note_id))
    );
  };

  // Set cached note id and folder id in local storage
  const setCachedNote = useCallback(
    (note_id: string, folder_id: string): void => {
      let newCachedNote: Record<string, string> = {};
      newCachedNote[note_id] = folder_id;
      localStorage.setItem(
        LocalKeys.CACHED_NOTES,
        JSON.stringify(newCachedNote)
      );
    },
    []
  );

  // Get cached note id and folder id from local storage
  const getCachedNote = useCallback((): Record<string, string> | null => {
    try {
      const cachedNotes = JSON.parse(
        localStorage.getItem(LocalKeys.CACHED_NOTES) || "{}"
      );
      return cachedNotes;
    } catch (error) {
      return null;
    }
  }, []);

  // Delete cached note from local storage
  const deleteCachedNote = useCallback((): void => {
    console.log("Delete cached note");
    localStorage.removeItem(LocalKeys.CACHED_NOTES);
  }, []);

  const cacheActiveNotes = useCallback(
    (activeNotes: Set<string>, note_id: string) => {
      activeNotes.add(note_id);
      const activeNotesArray = Array.from(activeNotes);
      localStorage.setItem(
        LocalKeys.ACTIVE_NOTES,
        JSON.stringify(activeNotesArray)
      );
    },
    []
  );

  const setActiveNotes = useCallback((activeNotes: Set<string>) => {
    let cachedActiveNotes: string[] = [];
    try {
      const activeNotes = JSON.parse(
        localStorage.getItem(LocalKeys.ACTIVE_NOTES) || "[]"
      );
      cachedActiveNotes = activeNotes;
    } catch (error) {}

    if (cachedActiveNotes.length > 0) {
      cachedActiveNotes.forEach((note_id) => {
        activeNotes.add(note_id);
      });
    }
  }, []);

  const deleteActiveNotes = useCallback(
    (activeNotes: Set<string>, note_id: string) => {
      activeNotes.delete(note_id);
      const activeNotesArray = Array.from(activeNotes);
      localStorage.setItem(
        LocalKeys.ACTIVE_NOTES,
        JSON.stringify(activeNotesArray)
      );
    },
    []
  );

  return {
    getFilteredNotes,
    setCachedNote,
    getCachedNote,
    deleteCachedNote,
    cacheActiveNotes,
    setActiveNotes,
    deleteActiveNotes,
  };
};
