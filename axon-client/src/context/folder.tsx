import React, { createContext, useEffect, useReducer, useState } from "react";
import folderReducer from "../reducers/folders";
import { Reducer } from "react";
import { IFolderAction, IFolderList } from "../types/folders";
import { ISelectedNote } from "src/types/notes";
import { fetchData } from "src/api/query";
import { useDataFetching } from "src/hooks/useDataFetching";

interface FolderProviderProps {
  children: React.ReactNode;
}

interface FolderContextProps {
  folders: IFolderList[] | null;
  folderDispatch: React.Dispatch<IFolderAction>;
  folderError: boolean;
  folderLoading: boolean;
  selectedNote: ISelectedNote;
  setSelectedNote: React.Dispatch<ISelectedNote>;
}

export const FolderContext = createContext({} as FolderContextProps);

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const {
    error: folderError,
    data: folderData,
    loading: folderLoading,
  } = useDataFetching<IFolderList[]>("folder-list", () =>
    fetchData("folder-list")
  );

  const [selectedNote, setSelectedNote] = useState<ISelectedNote>(
    {} as ISelectedNote
  );

  const [folders, folderDispatch] = useReducer<
    Reducer<IFolderList[], IFolderAction>
  >(folderReducer, [] as IFolderList[]);

  // Update initialFolders when folderData becomes available
  useEffect(() => {
    if (folderData) {
      setSelectedNote({
        ...selectedNote,
        folder_name: folderData[0].folder_name,
      });
      if (folderData[0]?.notes && folderData[0]?.notes.length > 0) {
        setSelectedNote({
          ...selectedNote,
          folder_name: folderData[0].folder_name,
          ...folderData[0].notes[0],
        });
      }
      folderDispatch({
        type: "INIT_FOLDER_LIST",
        payload: folderData as IFolderList[],
      });
    }
  }, [folderData]);
  console.log("folderData", folderData);
  console.log("selectedNote", selectedNote);

  // const InitialState: Array<IFolderList> = [];

  // const query = useQuery({
  //   queryKey: ["folders"],
  //   queryFn: GET_FOLDER_LIST,
  // });

  // const [folders, folderDispatch] = useReducer<
  //   Reducer<Array<IFolderList>, IFolderAction>
  // >(folderReducer, InitialState);

  // const [selectedNote, setSelectedNote] = useState<ISelectedNote>(
  //   {} as ISelectedNote
  // );

  // useEffect(() => {
  //   folderDispatch({
  //     type: "init_folder",
  //     payload: query.data,
  //   });

  //   if (query.data && query.data[0]?.notes && query.data[0]?.notes.length > 0) {
  //     setSelectedNote({
  //       ...selectedNote,
  //       folder_id: query.data[0].notes[0].folder_id,
  //       note_id: query.data[0].notes[0].note_id,
  //       name: query.data[0].notes[0].folder_name,
  //       description: query.data[0].notes[0].description,
  //       date_created: query.data[0].notes[0].date_created,
  //       last_edited: query.data[0].notes[0].last_edited,
  //     });
  //   }
  // }, [query.data]);

  return (
    <FolderContext.Provider
      value={{
        folders,
        folderDispatch,
        folderError,
        folderLoading,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContext;
