import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import folderStore from "./folder.json";
import { Reducer } from "react";
import { FolderActionProps, FolderListProps } from "../types/folders";
import { useQuery } from "@tanstack/react-query";
import { GET_FOLDER_LIST } from "../api/queries/folder";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: Array<FolderListProps> | null;
  folderDispatch: React.Dispatch<FolderActionProps>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const InitialState: Array<FolderListProps> = [];
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: GET_FOLDER_LIST,
  });

  const [folders, folderDispatch] = useReducer<
    Reducer<Array<FolderListProps>, FolderActionProps>
  >(folderReducer, InitialState);

  useEffect(() => {
    folderDispatch({
      type: "init_folder",
      payload: query.data,
    });
  }, [query.data]);

  console.log(query.data);

  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
