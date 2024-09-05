import { BoardAction, BoardState } from "./board.types";

export function boardReducer(
  state: BoardState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case "INIT_BOARD": {
      return {
        ...state,
        board: action.payload.board,
        boardQuery: action.payload.boardQuery,
        project: action.payload.project,
      };
    }
    case "INIT_NODES": {
      return {
        ...state,
        nodes: {
          ...state.nodes,
          data: action.payload.nodes,
          nodeQuery: action.payload.nodeQuery,
        },
      };
    }
    case "INIT_EDGES": {
      return {
        ...state,
        edges: {
          ...state.edges,
          data: action.payload.edges,
          edgeQuery: action.payload.edgeQuery,
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
