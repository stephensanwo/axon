import { UseMutationResult } from "@tanstack/react-query";
import {
  CreateProjectDto,
  UpdateProjectDto,
} from "src/domain/project/project.dto";
import {
  ProjectEntity,
  ProjectQueryKeys,
} from "src/domain/project/project.entity";
import projectService from "src/domain/project/project.service";
import { useDataMutation } from "src/hooks/api/useDataMutation";
import { useProjectContext } from "./useProjectContext";

export function useProject(): {
  createProject: UseMutationResult<
    ProjectEntity,
    unknown,
    CreateProjectDto,
    unknown
  >;
  deleteProject: UseMutationResult<boolean, unknown, string[], unknown>;
  updateProject: UseMutationResult<boolean, unknown, UpdateProjectDto, unknown>;
} {
  const { projectStateDispatch } = useProjectContext();
  const createProject = useDataMutation<CreateProjectDto, ProjectEntity>({
    mutationFn: async (dto: CreateProjectDto) =>
      projectService.createProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectQueryKeys.PROJECTS]],
  });

  const deleteProject = useDataMutation<string[], boolean>({
    mutationFn: async (dto: string[]) => projectService.deleteProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectQueryKeys.PROJECTS]],
    onSuccessCallback: () => {
      projectStateDispatch({
        type: "CLEAR_SELECTED_PROJECTS",
      });
    },
  });

  const updateProject = useDataMutation<UpdateProjectDto, boolean>({
    mutationFn: async (dto: UpdateProjectDto) =>
      projectService.updateProject(dto),
    optionalQueryKeysToInvalidate: [[...ProjectQueryKeys.PROJECTS]],
  });

  return {
    createProject,
    deleteProject,
    updateProject,
  };
}
