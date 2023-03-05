import {
  INode,
  NodeContentProps,
  NodeDataProps,
  NodeStyleProps,
  NoteActionProps,
  NoteProps,
} from "types/notes";
import { v4 as uuidv4 } from "uuid";

const noteReducer = (note: NoteProps, action: NoteActionProps) => {
  switch (action.type) {
    case "init_note": {
      return action.payload;
    }

    case "add_node": {
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
