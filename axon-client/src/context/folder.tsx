import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import folderStore from "./folder.json";
import { Reducer } from "react";
import { FolderActionProps, FolderListProps } from "../types/folders";
import { useQuery } from "@tanstack/react-query";
import { GET_FOLDER_LIST } from "../api/queries/folder";
import { SelectedNoteProps } from "types/notes";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: Array<FolderListProps> | null;
  folderDispatch: React.Dispatch<FolderActionProps>;
  selectedNote: SelectedNoteProps;
  setSelectedNote: React.Dispatch<SelectedNoteProps>;
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

  const [selectedNote, setSelectedNote] = useState<SelectedNoteProps>({
    folder_id: "",
    note_id: "",
  });

  useEffect(() => {
    folderDispatch({
      type: "init_folder",
      payload: query.data,
    });

    let first_folder_id = "";
    let first_note_id = "";
    if (query.data && query.data[0].notes && query.data[0].notes.length > 0) {
      first_folder_id = query.data[0].notes[0].folder_id;
      first_note_id = query.data[0].notes[0].note_id;
    }
    setSelectedNote({
      ...selectedNote,
      folder_id: first_folder_id,
      note_id: first_note_id,
    });
  }, [query.data]);

  console.log(query.data);
  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
