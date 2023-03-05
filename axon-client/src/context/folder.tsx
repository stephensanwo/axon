import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import { Reducer } from "react";
import { IFolderAction, IFolderList } from "../types/folders";
import { useQuery } from "@tanstack/react-query";
import { GET_FOLDER_LIST } from "../api/queries/folder";
import { ISelectedNote } from "types/notes";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: Array<IFolderList> | null;
  folderDispatch: React.Dispatch<IFolderAction>;
  selectedNote: ISelectedNote;
  setSelectedNote: React.Dispatch<ISelectedNote>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const InitialState: Array<IFolderList> = [];

  const query = useQuery({
    queryKey: ["folders"],
    queryFn: GET_FOLDER_LIST,
  });

  const [folders, folderDispatch] = useReducer<
    Reducer<Array<IFolderList>, IFolderAction>
  >(folderReducer, InitialState);

  const [selectedNote, setSelectedNote] = useState<ISelectedNote>(
    {} as ISelectedNote
  );

  useEffect(() => {
    folderDispatch({
      type: "init_folder",
      payload: query.data,
    });

    if (query.data && query.data[0]?.notes && query.data[0]?.notes.length > 0) {
      setSelectedNote({
        ...selectedNote,
        folder_id: query.data[0].notes[0].folder_id,
        note_id: query.data[0].notes[0].note_id,
        name: query.data[0].notes[0].name,
        description: query.data[0].notes[0].description,
        date_created: query.data[0].notes[0].date_created,
        last_edited: query.data[0].notes[0].last_edited,
      });
    }
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
