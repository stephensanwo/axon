import React, { createContext, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import { Reducer } from "react";
import { IFolderAction, IFolderList } from "../types/folders";
import { ISelectedNote } from "src/types/notes";
import { useInitFolders } from "src/hooks/folders/useInitFolders";
import { UseQueryResult } from "@tanstack/react-query";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: IFolderList[] | null;
  folderDispatch: React.Dispatch<IFolderAction>;
  folderQuery: UseQueryResult<IFolderList[], unknown>;
  selectedNote: ISelectedNote;
  setSelectedNote: React.Dispatch<ISelectedNote>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const [selectedNote, setSelectedNote] = useState<ISelectedNote>(
    {} as ISelectedNote
  );

  const [folders, folderDispatch] = useReducer<
    Reducer<IFolderList[], IFolderAction>
  >(folderReducer, [] as IFolderList[]);

  const { folderQuery } = useInitFolders(
    folderDispatch,
    selectedNote,
    setSelectedNote
  );

  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
        folderQuery,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
