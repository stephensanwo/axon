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
        pinnedProjects: action.payload.documentFolders.filter(
          (project) => project.pinned
        ),
      };
    }
    case "SET_CREATE_PROJECT_FORM": {
      return {
        ...state,
        createProjectForm: action.payload,
      };
    }
    case "CLEAR_CREATE_PROJECT_FORM": {
      return {
        ...state,
        createProjectForm: null,
      };
    }
    case "SELECT_PROJECT": {
      return {
        ...state,
        selectedProjects: [action.payload, ...state.selectedProjects],
      };
    }
    case "REMOVE_SELECTED_PROJECT": {
      return {
        ...state,
        selectedProjects: state.selectedProjects.filter(
          (project) => project.id !== action.payload
        ),
      };
    }
    case "CLEAR_SELECTED_PROJECTS": {
      return {
        ...state,
        selectedProjects: [],
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
