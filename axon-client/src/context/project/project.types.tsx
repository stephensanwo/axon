import { UseQueryResult } from "@tanstack/react-query";
import { CreateProjectDto } from "src/domain/project/project.dto";
import { ProjectEntity } from "src/domain/project/project.entity";

export type ProjectState = {
  data: ProjectEntity[];
  query: UseQueryResult<ProjectEntity[], unknown>;
  createProjectForm: CreateProjectDto | null;
  selectedProjects: ProjectEntity[];
  pinnedProjects: ProjectEntity[];
};

export type ProjectAction =
  | {
      type: "INIT_PROJECTS";
      payload: {
        documentFolders: ProjectEntity[];
        query: UseQueryResult<ProjectEntity[], unknown>;
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
