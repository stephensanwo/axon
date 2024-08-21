import React, { Reducer, createContext, useEffect, useReducer } from "react";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { ProjectAction, ProjectState } from "./project.types";
import { projectReducer } from "./project.reducer";
import {
  ProjectEntity,
  ProjectQueryKeys,
} from "src/domain/project/project.entity";
import projectService from "src/domain/project/project.service";
import { GetProjectResponseDto } from "src/domain/project/project.dto";
import { useProjectRoute } from "./hooks/useProjectRoute";

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface ProjectContextProps {
  projectState: ProjectState;
  projectStateDispatch: React.Dispatch<ProjectAction>;
}

const ProjectContext = createContext({} as ProjectContextProps);

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { projectName } = useProjectRoute();

  const projectsQuery = useDataQuery<ProjectEntity[]>({
    queryKey: [...ProjectQueryKeys.PROJECTS],
    queryFn: async () => projectService.getProjects(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const projectQuery = useDataQuery<GetProjectResponseDto | null>({
    queryKey: [...ProjectQueryKeys.PROJECTS, projectName || "notfound"],
    queryFn: async () => projectService.getProjectFiles(projectName || ""),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const [projectState, projectStateDispatch] = useReducer<
    Reducer<ProjectState, ProjectAction>
  >(projectReducer, {
    projects: {
      data: [],
      query: projectsQuery,
      createProjectForm: null,
      selectedProjects: [],
      pinnedProjects: [],
    },
    project: {
      project: null,
      flows: null,
      query: projectQuery,
    },
  });

  useEffect(() => {
    if (projectsQuery.data && projectsQuery.isFetched) {
      projectStateDispatch({
        type: "INIT_PROJECTS",
        payload: {
          projects: projectsQuery.data,
          query: projectsQuery,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectQuery.data]);

  useEffect(() => {
    if (projectQuery.data && projectQuery.isFetched) {
      projectStateDispatch({
        type: "INIT_PROJECT_FLOWS",
        payload: {
          flows: projectQuery.data.flows || [],
          query: projectQuery,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectQuery.data]);

  useEffect(() => {
    const project = projectsQuery.data?.find(
      (project) => project.id === projectQuery.data?.projectId
    );

    projectStateDispatch({
      type: "INIT_PROJECT",
      payload: project || null,
    });
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
