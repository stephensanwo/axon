// import { ProjectAction, ProjectState } from "./project.types";

// export function projectReducer(
//   state: ProjectState,
//   action: ProjectAction
// ): ProjectState {
//   switch (action.type) {
//     case "INIT_PROJECT_FOLDERS": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           projects: action.payload.data.projects,
//           query: action.payload.query,
//           pinnedProjects: action.payload.data.projects.filter(
//             (project) => project.pinned
//           ),
//           projectTree: action.payload.data.projectTree,
//         },
//       };
//     }
//     case "INIT_PROJECT_FILES_PARENT": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           project: action.payload,
//         },
//       };
//     }
//     case "INIT_PROJECT_BOARDS": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           boards: action.payload.boards,
//           pinnedBoards: action.payload.boards.filter((board) => board.pinned),
//           query: action.payload.query,
//           createBoardForm: {
//             ...state.projectFiles.createBoardForm!!,
//             projectId: action.payload.query.data?.projectId!!,
//           },
//         },
//       };
//     }
//     case "SET_CREATE_PROJECT_FORM": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           createProjectForm: action.payload,
//         },
//       };
//     }
//     case "CLEAR_CREATE_PROJECT_FORM": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           createProjectForm: null,
//         },
//       };
//     }
//     case "SELECT_PROJECT": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           selectedProjects: [
//             ...state.projectFolders.selectedProjects,
//             action.payload,
//           ],
//         },
//       };
//     }
//     case "REMOVE_SELECTED_PROJECT": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           selectedProjects: state.projectFolders.selectedProjects.filter(
//             (project) => project.id !== action.payload
//           ),
//         },
//       };
//     }
//     case "CLEAR_SELECTED_PROJECTS": {
//       return {
//         ...state,
//         projectFolders: {
//           ...state.projectFolders,
//           selectedProjects: [],
//         },
//       };
//     }
//     case "SET_CREATE_BOARD_FORM": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           createBoardForm: action.payload,
//         },
//       };
//     }
//     case "CLEAR_CREATE_BOARD_FORM": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           createBoardForm: null,
//         },
//       };
//     }
//     case "SELECT_BOARD": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           selectedBoards: [
//             ...state.projectFiles.selectedBoards,
//             action.payload,
//           ],
//         },
//       };
//     }
//     case "REMOVE_SELECTED_BOARD": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           selectedBoards: state.projectFiles.selectedBoards.filter(
//             (board) => board.id !== action.payload
//           ),
//         },
//       };
//     }
//     case "CLEAR_SELECTED_BOARDS": {
//       return {
//         ...state,
//         projectFiles: {
//           ...state.projectFiles,
//           selectedBoards: [],
//         },
//       };
//     }
//     default: {
//       throw Error("Unknown action: " + action);
//     }
//   }
// }
