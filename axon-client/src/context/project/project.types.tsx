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
  ProjectEntityKeys,
  ProjectTreeEntity,
} from "src/domain/project/project.entity";

// export type ProjectState = {
//   projectFolders: {
//     projects: ProjectEntity[];
//     query: UseQueryResult<GetProjectsResponseDto, unknown>;
//     createProjectForm: CreateProjectDto | null;
//     selectedProjects: ProjectEntity[];
//     pinnedProjects: ProjectEntity[];
//     projectTree: ProjectTreeEntity;
//   };
//   projectFiles: {
//     project: ProjectEntity | null;
//     boards: BoardEntity[];
//     pinnedBoards: BoardEntity[];
//     selectedBoards: BoardEntity[];
//     createBoardForm: CreateBoardDto | null;
//     query: UseQueryResult<GetProjectResponseDto | null, unknown>;
//   };
// };

export type ProjectLevels = "projects" | "project";

export enum ProjectRouteParams {
  PROJECT_NAME = "projectName",
}

export const ProjectFoldersQueryKeys = [
  ProjectEntityKeys.PROJECTS,
  ProjectEntityKeys.FOLDERS,
];
export const ProjectFilesQueryKeys = [
  ProjectEntityKeys.PROJECTS,
  ProjectEntityKeys.FOLDER,
];
