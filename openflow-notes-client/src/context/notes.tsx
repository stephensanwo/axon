import React, { createContext, useState } from "react";
import noteStore from "./notes.json";

interface NoteContextProviderProps {
  children: React.ReactNode;
}

export interface NoteProps {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  data?: string;
  version?: string;
}
interface FolderProps {
  id: string;
  name: string;
  created_by: string;
  created_on: string;
  last_edit?: string;
  link: string;
  notes: Array<NoteProps>;
}

interface NoteContextProps {
  folders: Array<FolderProps>;
  setFolders:
    | React.Dispatch<React.SetStateAction<Array<FolderProps>>>
    | React.Dispatch<React.SetStateAction<FolderProps>>
    | any;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [folders, setFolders] = useState<any>(noteStore);

  return (
    <NoteContext.Provider
      value={{
        folders,
        setFolders,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
