import { UseQueryResult } from "@tanstack/react-query";
import { FlowEntity } from "src/domain/flow/flow.entity";
import {
  CreateProjectDto,
  GetProjectResponseDto,
} from "src/domain/project/project.dto";
import { ProjectEntity } from "src/domain/project/project.entity";

export type ProjectState = {
  projects: {
    data: ProjectEntity[];
    query: UseQueryResult<ProjectEntity[], unknown>;
    createProjectForm: CreateProjectDto | null;
    selectedProjects: ProjectEntity[];
    pinnedProjects: ProjectEntity[];
  };
  project: {
    project: ProjectEntity | null;
    flows: FlowEntity[] | null;
    query: UseQueryResult<GetProjectResponseDto | null, unknown>;
  };
};

export type ProjectLevels = "projects" | "project";

export enum ProjectRouteParams {
  PROJECT_NAME = "projectName",
}

export type ProjectAction =
  | {
      type: "INIT_PROJECTS";
      payload: {
        projects: ProjectEntity[];
        query: UseQueryResult<ProjectEntity[], unknown>;
      };
    }
  | {
      type: "INIT_PROJECT";
      payload: ProjectEntity | null;
    }
  | {
      type: "INIT_PROJECT_FLOWS";
      payload: {
        flows: FlowEntity[];
        query: UseQueryResult<GetProjectResponseDto | null, unknown>;
      };
    }
  | {
      type: "SET_CREATE_PROJECT_FORM";
      payload: CreateProjectDto;
    }
  | {
      type: "CLEAR_CREATE_PROJECT_FORM";
    }
  | {
      type: "SELECT_PROJECT";
      payload: ProjectEntity;
    }
  | {
      type: "REMOVE_SELECTED_PROJECT";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_PROJECTS";
    };
