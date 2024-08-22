import { ProjectAction, ProjectState } from "./project.types";

export function projectReducer(
  state: ProjectState,
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case "INIT_PROJECT_FOLDERS": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          data: action.payload.projectFolders,
          query: action.payload.query,
          pinnedProjects: action.payload.projectFolders.filter(
            (project) => project.pinned
          ),
        },
      };
    }
    case "INIT_PROJECT_FILES_PARENT": {
      return {
        ...state,
        projectFiles: {
          ...state.projectFiles,
          project: action.payload,
        },
      };
    }
    case "INIT_PROJECT_FLOWS": {
      return {
        ...state,
        projectFiles: {
          ...state.projectFiles,
          flows: action.payload.flows,
          query: action.payload.query,
        },
      };
    }
    case "SET_CREATE_PROJECT_FORM": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          createProjectForm: action.payload,
        },
      };
    }
    case "CLEAR_CREATE_PROJECT_FORM": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          createProjectForm: null,
        },
      };
    }
    case "SELECT_PROJECT": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          selectedProjects: [
            ...state.projectFolders.selectedProjects,
            action.payload,
          ],
        },
      };
    }
    case "REMOVE_SELECTED_PROJECT": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          selectedProjects: state.projectFolders.selectedProjects.filter(
            (project) => project.id !== action.payload
          ),
        },
      };
    }
    case "CLEAR_SELECTED_PROJECTS": {
      return {
        ...state,
        projectFolders: {
          ...state.projectFolders,
          selectedProjects: [],
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
