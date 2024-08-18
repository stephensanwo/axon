import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { ProjectAction, ProjectState } from "./project.types";
import { projectReducer } from "./project.reducer";
import {
  ProjectEntity,
  ProjectQueryKeys,
} from "src/domain/project/project.entity";
import projectService from "src/domain/project/project.service";

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface ProjectContextProps {
  projectState: ProjectState;
  projectStateDispatch: React.Dispatch<ProjectAction>;
}

const ProjectContext = createContext({} as ProjectContextProps);

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const projectQuery = useDataQuery<ProjectEntity[]>({
    queryKey: [...ProjectQueryKeys.PROJECTS],
    queryFn: async () => projectService.getProjects(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [projectState, projectStateDispatch] = useReducer<
    Reducer<ProjectState, ProjectAction>
  >(projectReducer, {
    data: [],
    query: projectQuery,
  });

  useEffect(() => {
    if (projectQuery.data && projectQuery.isFetched) {
      projectStateDispatch({
        type: "INIT_PROJECTS",
        payload: {
          documentFolders: projectQuery.data,
          query: projectQuery,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectQuery.data]);

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        projectStateDispatch,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
