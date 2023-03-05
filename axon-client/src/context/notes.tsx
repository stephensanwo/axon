import React, { createContext, useEffect, useReducer, useState } from "react";
import noteReducer from "../reducers/notes";
import { Reducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { NoteActionProps, NoteProps } from "types/notes";
import { GET_NOTE_DETAIL } from "api/queries/note";

interface NoteProviderProps {
  children: React.ReactNode;
}

interface NoteContextProps {
  note: NoteProps | null;
  noteDispatch: React.Dispatch<NoteActionProps>;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const InitialState: NoteProps = {
    date_created: "",
    description: "",
    folder_id: "",
    last_edited: "",
    name: "",
    note_id: "",
    user_id: "",
    nodes: [],
    edges: [],
  };

  const [note, noteDispatch] = useReducer<Reducer<NoteProps, NoteActionProps>>(
    noteReducer,
    InitialState
  );

  return (
    <NoteContext.Provider
      value={{
        note,
        noteDispatch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
