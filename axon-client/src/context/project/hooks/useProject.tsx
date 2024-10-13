import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
  CreateProjectDto,
  GetProjectResponseDto,
  GetProjectsResponseDto,
  UpdateProjectDto,
} from "src/domain/project/project.dto";
import { ProjectEntity } from "src/domain/project/project.entity";
import projectService from "src/domain/project/project.service";
import { useDataMutation } from "src/hooks/api/useDataMutation";
import { useDataQuery } from "src/hooks/api/useDataQuery";
import { useProjectRoute } from "./useProjectRoute";
import { useProjectStore } from "../project.store";
import {
  ProjectFilesQueryKeys,
  ProjectFoldersQueryKeys,
} from "../project.types";

export function useProject(): {
  createProject: UseMutationResult<
    ProjectEntity,
    unknown,
    CreateProjectDto,
    unknown
  >;
  deleteProject: UseMutationResult<boolean, unknown, string[], unknown>;
  updateProject: UseMutationResult<boolean, unknown, UpdateProjectDto, unknown>;
  projectFolders: UseQueryResult<GetProjectsResponseDto | null, unknown>;
  projectFiles: UseQueryResult<GetProjectResponseDto | null, unknown>;
} {
  const {
    projectName,
    updateProjectRouteSearchParams,
    clearProjectRouteSearchParams,
  } = useProjectRoute();
  const { setCreateProjectForm, setSelectedProjects } = useProjectStore();

  const createProject = useDataMutation<CreateProjectDto, ProjectEntity>({
    mutationFn: async (dto: CreateProjectDto) =>
      projectService.createProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFoldersQueryKeys]],
    onSuccessCallback: () => {
      setCreateProjectForm(null);
    },
  });

  const deleteProject = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => projectService.deleteProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFoldersQueryKeys]],
    onSuccessCallback: () => {
      setSelectedProjects([]);
    },
  });

  const updateProject = useDataMutation<UpdateProjectDto, boolean>({
    mutationFn: async (dto: UpdateProjectDto) =>
      projectService.updateProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectFoldersQueryKeys]],
  });

  const projectFolders = useDataQuery<GetProjectsResponseDto | null>({
    queryKey: [...ProjectFoldersQueryKeys],
    queryFn: async () => projectService.getProjects(),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const projectFiles = useDataQuery<GetProjectResponseDto | null>({
    queryKey: [...ProjectFilesQueryKeys, projectName],
    queryFn: async () => projectService.getProjectFiles(projectName),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return {
    createProject,
    deleteProject,
    updateProject,
    projectFolders,
    projectFiles,
  };
}
