import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import { Reducer } from "react";
import {
  IFolderAction,
  IFolderList,
  IFolderMenuEvents,
  INoteSummary,
} from "../types/folders";
import { useInitFolders } from "src/hooks/folders/useInitFolders";
import { UseQueryResult } from "@tanstack/react-query";
import { useSet } from "@uidotdev/usehooks";
import { useFolderQuery } from "src/hooks/folders/useFolderQuery";
interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: IFolderList[] | null;
  folderDispatch: React.Dispatch<IFolderAction>;
  folderQuery: UseQueryResult<IFolderList[], unknown>;
  selectedNote: INoteSummary | null;
  setSelectedNote: React.Dispatch<INoteSummary | null>;
  selectedFolder: IFolderList | undefined;
  setSelectedFolder: React.Dispatch<
    React.SetStateAction<IFolderList | undefined>
  >;
  activeNotes: Set<string>;
  folderMenu: IFolderMenuEvents;
  setFolderMenu: React.Dispatch<React.SetStateAction<IFolderMenuEvents>>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const { folderData, folderQuery } = useFolderQuery();
  const [folderMenu, setFolderMenu] = useState<IFolderMenuEvents>({
    newFolder: false,
    updateFolder: false,
    newNote: false,
    updateNote: false,
  });

  const [selectedFolder, setSelectedFolder] = useState<IFolderList>();
  const [selectedNote, setSelectedNote] = useState<INoteSummary | null>(null);
  const activeNotes = useSet<string>([]);

  const { folders, folderDispatch } = useInitFolders(
    setSelectedNote,
    activeNotes,
    folderData
  );

  // useEffect(() => {
  //   console.log("Selected Note from Folder Context", selectedNote);
  //   if (selectedNote?.note_id) {
  //     activeNotes.add(selectedNote?.note_id);
  //   }
  // }, [selectedNote]);

  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
        folderQuery,
        selectedNote,
        setSelectedNote,
        selectedFolder,
        setSelectedFolder,
        activeNotes,
        folderMenu,
        setFolderMenu,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
