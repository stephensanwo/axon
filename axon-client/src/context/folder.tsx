import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import { Reducer } from "react";
import { IFolderAction, IFolderList } from "../types/folders";
import { ISelectedNote } from "src/types/notes";
import { useFolderQuery } from "src/hooks/folders/useFolderQuery";
import { useInitFolders } from "src/hooks/folders/useInitFolders";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: IFolderList[] | null;
  folderDispatch: React.Dispatch<IFolderAction>;
  folderError: unknown;
  folderStatus: "error" | "success" | "loading";
  folderFetching: boolean;
  selectedNote: ISelectedNote;
  setSelectedNote: React.Dispatch<ISelectedNote>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const { folderData, folderError, folderStatus, folderFetching } =
    useFolderQuery();

  const [selectedNote, setSelectedNote] = useState<ISelectedNote>(
    {} as ISelectedNote
  );

  const [folders, folderDispatch] = useReducer<
    Reducer<IFolderList[], IFolderAction>
  >(folderReducer, [] as IFolderList[]);

  const { initFolders } = useInitFolders(
    folderData,
    folderDispatch,
    selectedNote,
    setSelectedNote
  );

  // Update initialFolders when folderData becomes available
  useEffect(() => {
    initFolders();
  }, [folderData]);

  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
        folderError,
        folderStatus,
        folderFetching,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
