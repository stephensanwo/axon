import { INote, INoteAction } from "src/types/notes";

const noteReducer = (note: INote, action: INoteAction) => {
  switch (action.type) {
    case "INIT_NOTE": {
      return action.payload;
    }

    case "UPDATE_NODES": {
      return {
        ...note,
        nodes: action.payload,
      };
    }
    case "UPDATE_EDGES": {
      return {
        ...note,
        edges: action.payload,
      };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default noteReducer;
