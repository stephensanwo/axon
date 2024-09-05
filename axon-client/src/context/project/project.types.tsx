import { UseQueryResult } from "@tanstack/react-query";
import { CreateBoardDto } from "src/domain/board/board.dto";
import { BoardEntity } from "src/domain/board/board.entity";
import {
  CreateProjectDto,
  GetProjectResponseDto,
  GetProjectsResponseDto,
} from "src/domain/project/project.dto";
import {
  ProjectEntity,
  ProjectTreeEntity,
} from "src/domain/project/project.entity";

export type ProjectState = {
  projectFolders: {
    projects: ProjectEntity[];
    query: UseQueryResult<GetProjectsResponseDto, unknown>;
    createProjectForm: CreateProjectDto | null;
    selectedProjects: ProjectEntity[];
    pinnedProjects: ProjectEntity[];
    projectTree: ProjectTreeEntity;
  };
  projectFiles: {
    project: ProjectEntity | null;
    boards: BoardEntity[];
    pinnedBoards: BoardEntity[];
    selectedBoards: BoardEntity[];
    createBoardForm: CreateBoardDto | null;
    query: UseQueryResult<GetProjectResponseDto | null, unknown>;
  };
};

export type ProjectLevels = "projects" | "project";

export enum ProjectRouteParams {
  PROJECT_NAME = "projectName",
}

export type ProjectAction =
  | {
      type: "INIT_PROJECT_FOLDERS";
      payload: {
        data: GetProjectsResponseDto;
        query: UseQueryResult<GetProjectsResponseDto, unknown>;
      };
    }
  | {
      type: "INIT_PROJECT_FILES_PARENT";
      payload: ProjectEntity | null;
    }
  | {
      type: "INIT_PROJECT_BOARDS";
      payload: {
        boards: BoardEntity[];
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
    }
  | {
      type: "SET_CREATE_BOARD_FORM";
      payload: CreateBoardDto | null;
    }
  | {
      type: "CLEAR_CREATE_BOARD_FORM";
    }
  | {
      type: "SELECT_BOARD";
      payload: BoardEntity;
    }
  | {
      type: "REMOVE_SELECTED_BOARD";
      payload: string;
    }
  | {
      type: "CLEAR_SELECTED_BOARDS";
    };
    

