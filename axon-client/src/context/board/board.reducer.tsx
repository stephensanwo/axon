import { BoardAction, BoardState } from "./board.types";

export function boardReducer(
  state: BoardState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case "INIT_BOARD": {
      return {
        ...state,
        data: action.payload.data,
        query: action.payload.query,
        project: action.payload.project,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
