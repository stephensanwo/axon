import { NoteActionProps, NoteProps } from "types/notes";

const noteReducer = (note: NoteProps, action: NoteActionProps) => {
  switch (action.type) {
    case "init_note": {
      return action.payload;
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default noteReducer;
