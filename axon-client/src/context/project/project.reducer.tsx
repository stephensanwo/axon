import { ProjectAction, ProjectState } from "./project.types";

export function projectReducer(
  state: ProjectState,
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case "INIT_PROJECTS": {
      return {
        ...state,
        data: action.payload.documentFolders,
        query: action.payload.query,
      };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
