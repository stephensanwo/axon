// import React, { Reducer, createContext, useEffect, useReducer } from "react";
// import { useDataQuery } from "src/hooks/api/useDataQuery";
// import { ProjectAction, ProjectState } from "./project.types";
// import { projectReducer } from "./project.reducer";
// import {
//   ProjectEntity,
//   ProjectQueryKeys,
// } from "src/domain/project/project.entity";
// import projectService from "src/domain/project/project.service";
// import {
//   GetProjectResponseDto,
//   GetProjectsResponseDto,
// } from "src/domain/project/project.dto";
// import { useProjectRoute } from "./hooks/useProjectRoute";

// interface ProjectProviderProps {
//   children: React.ReactNode;
// }

// interface ProjectContextProps {
//   projectState: ProjectState;
//   projectStateDispatch: React.Dispatch<ProjectAction>;
// }

// const ProjectContext = createContext({} as ProjectContextProps);

// const ProjectProvider = ({ children }: ProjectProviderProps) => {
//   const { projectName } = useProjectRoute();

//   const projectFoldersQuery = useDataQuery<GetProjectsResponseDto>({
//     queryKey: [...ProjectQueryKeys.PROJECTS],
//     queryFn: async () => projectService.getProjects(),
//     refetchOnMount: true,
//     refetchOnReconnect: true,
//     refetchOnWindowFocus: true,
//   });

//   const projectFilesQuery = useDataQuery<GetProjectResponseDto | null>({
//     queryKey: [...ProjectQueryKeys.PROJECT_FILES, projectName || "notfound"],
//     queryFn: async () => projectService.getProjectFiles(projectName || ""),
//     refetchOnMount: true,
//     refetchOnReconnect: true,
//     refetchOnWindowFocus: true,
//   });

//   const [projectState, projectStateDispatch] = useReducer<
//     Reducer<ProjectState, ProjectAction>
//   >(projectReducer, {
//     projectFolders: {
//       projects: [],
//       query: projectFoldersQuery,
//       createProjectForm: null,
//       selectedProjects: [],
//       pinnedProjects: [],
//       projectTree: {},
//     },
//     projectFiles: {
//       project: null,
//       boards: [],
//       pinnedBoards: [],
//       selectedBoards: [],
//       createBoardForm: null,
//       query: projectFilesQuery,
//     },
//   });

//   useEffect(() => {
//     if (projectFoldersQuery.data && projectFoldersQuery.isFetched) {
//       projectStateDispatch({
//         type: "INIT_PROJECT_FOLDERS",
//         payload: {
//           data: projectFoldersQuery.data,
//           query: projectFoldersQuery,
//         },
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [projectFoldersQuery.data]);

//   useEffect(() => {
//     if (projectFilesQuery.data && projectFilesQuery.isFetched) {
//       projectStateDispatch({
//         type: "INIT_PROJECT_BOARDS",
//         payload: {
//           boards: projectFilesQuery.data.boards || [],
//           query: projectFilesQuery,
//         },
//       });
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [projectFilesQuery.data]);

//   useEffect(() => {
//     const project = projectFoldersQuery.data?.projects?.find(
//       (project) => project.id === projectFilesQuery.data?.projectId
//     );

//     projectStateDispatch({
//       type: "INIT_PROJECT_FILES_PARENT",
//       payload: project || null,
//     });
//   }, [projectFilesQuery.data]);

//   return (
//     <ProjectContext.Provider
//       value={{
//         projectState,
//         projectStateDispatch,
//       }}
//     >
//       {children}
//     </ProjectContext.Provider>
//   );
// };

// export { ProjectProvider, ProjectContext };
