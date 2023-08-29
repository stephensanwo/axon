import { ColorPalette } from "src/shared/themes";
import { nodeEvents } from "src/types/node";
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

      const lastNode =
        note.nodes.length > 0 ? note.nodes[note.nodes.length - 1] : null;
      const newX = lastNode
        ? lastNode.position.x + 100 + 280
        : window.innerWidth / 2.5;
      const newY = lastNode
        ? lastNode.position.y + 0
        : window.outerHeight / 2.5;
      const newNode = {
        id: id,
        type: "input",
        data: {
          id: id,
          title: "Text Box",
          description: "Text Description",
          category: action.payload.node_type,
          node_styles: {
            node_background_color:
              action.payload.default_theme.node_background_color,
            node_border_color: action.payload.default_theme.node_border_color,
            font_color: action.payload.default_theme.font_color,
          } as NodeStyleProps,
        } as NodeDataProps,
        position: {
          x: newX,
          y: newY,
        },
        className: action.payload.node_type,
        content: "",
      } as INode;

      // Send Node Event
      action.payload.eventFn &&
        action.payload.eventFn(nodeEvents.ADD_NODE, newNode);

      return { ...note, nodes: [...note.nodes, newNode] };
    }

    case "UPDATE_NODE": {
      const { node_id, updated_fields } = action.payload;

      const updatedNodes = note.nodes?.map((node) => {
        if (node.id === node_id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updated_fields,
            },
          };
        }
        return node;
      });

      return { ...note, nodes: updatedNodes };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default noteReducer;
