import { CreateNoteProps, SelectedNoteProps } from "types/notes";
import { axiosPrivate } from "../axios";

export const GET_NOTE_DETAIL = async (selectedNote: SelectedNoteProps) => {
  if (selectedNote.folder_id === "" || selectedNote.note_id === "") {
    return null;
  } else {
    const response = await axiosPrivate.get(
      `/note-detail?folder_id=${selectedNote.folder_id}&note_id=${selectedNote.note_id}`
    );
    return response.data;
  }
};

export const CREATE_NEW_NOTE = async (note: CreateNoteProps) => {
  const response = await axiosPrivate.post("/note", note);
  return response;
};

export const DELETE_NOTE = async (selectedNote: SelectedNoteProps) => {
  if (selectedNote.folder_id === "" || selectedNote.note_id === "") {
    return null;
  } else {
    const response = await axiosPrivate.delete(
      `/note?folder_id=${selectedNote.folder_id}&note_id=${selectedNote.note_id}`
    );
    return response.data;
  }
};
