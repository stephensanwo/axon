import {
  INode,
  INote,
  INoteAction,
  NodeDataProps,
  NodeStyleProps,
} from "src/types/notes";
import { v4 as uuidv4 } from "uuid";

const noteReducer = (note: INote, action: INoteAction) => {
  switch (action.type) {
    case "INIT_NOTE": {
      return action.payload;
    }

    case "ADD_NODE": {
      let id = uuidv4();
      const newNode = {
        id: id,
        type: "input",
        data: {
          id: id,
          label: "Node Label",
          title: "Node Title",
          description: "Node Description",
          category: action.payload.node_type,
        } as NodeDataProps,
        position: {
          x: 100,
          y: 50,
        },
        className: action.payload.node_type,
        content: "",
        node_styles: {} as NodeStyleProps,
      } as INode;

      console.log(newNode);
      return { ...note, nodes: [...note.nodes, newNode] };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default noteReducer;
