import React, { createContext, useReducer, useState } from "react";
import noteReducer from "../reducers/notes";
import { Reducer } from "react";
import { INote, INoteAction } from "src/types/notes";

interface NoteProviderProps {
  children: React.ReactNode;
}

interface NoteContextProps {
  note: INote;
  noteDispatch: React.Dispatch<INoteAction>;
}

export const NoteContext = createContext({} as NoteContextProps);

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [note, noteDispatch] = useReducer<Reducer<INote, INoteAction>>(
    noteReducer,
    {} as INote
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
