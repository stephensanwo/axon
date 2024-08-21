import { ProjectAction, ProjectState } from "./project.types";

export function projectReducer(
  state: ProjectState,
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case "INIT_PROJECTS": {
      return {
        ...state,
        projects: {
          ...state.projects,
          data: action.payload.projects,
          query: action.payload.query,
          pinnedProjects: action.payload.projects.filter(
            (project) => project.pinned
          ),
        },
      };
    }
    case "INIT_PROJECT": {
        return {
          ...state,
          project: {
            ...state.project,
            project: action.payload
          },
        };
      }
    case "INIT_PROJECT_FLOWS": {
        return {
          ...state,
          project: {
            ...state.project,
            flows: action.payload.flows,
            query: action.payload.query,
          },
        };
    }
    case "SET_CREATE_PROJECT_FORM": {
      return {
        ...state,
        projects: {
          ...state.projects,
          createProjectForm: action.payload,
        },
      };
    }
    case "CLEAR_CREATE_PROJECT_FORM": {
      return {
        ...state,
        projects: {
          ...state.projects,
          createProjectForm: null,
        },
      };
    }
    case "SELECT_PROJECT": {
      return {
        ...state,
        projects: {
          ...state.projects,
          selectedProjects: [
            ...state.projects.selectedProjects,
            action.payload,
          ],
        },
      };
    }
    case "REMOVE_SELECTED_PROJECT": {
      return {
        ...state,
        projects: {
          ...state.projects,
          selectedProjects: state.projects.selectedProjects.filter(
            (project) => project.id !== action.payload
          ),
        },
      };
    }
    case "CLEAR_SELECTED_PROJECTS": {
      return {
        ...state,
        projects: {
          ...state.projects,
          selectedProjects: [],
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
