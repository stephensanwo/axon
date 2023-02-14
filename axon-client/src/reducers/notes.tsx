import { FolderProps, NotesActionProps, NotesActionType } from "../types/notes";

const noteReducer = (folder: Array<FolderProps>, action: NotesActionProps) => {
  switch (action.type) {
    case NotesActionType.NEW_FOLDER: {
      return [...folder, action.payload];
    }
    case NotesActionType.EDIT_FOLDER: {
      return;
    }
    case NotesActionType.DELETE_FOLDER: {
      return;
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default noteReducer;
