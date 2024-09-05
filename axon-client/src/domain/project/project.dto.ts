import { BaseEntity } from "src/db/db.types";
import {
  ProjectData,
  ProjectEntity,
  ProjectTreeEntity,
} from "./project.entity";
import { BoardEntity } from "../board/board.entity";

export type CreateProjectDto = ProjectData;

export type UpdateProjectDto = BaseEntity & ProjectData;

export type GetProjectsResponseDto = {
  projects: ProjectEntity[];
  projectTree: ProjectTreeEntity;
};

export type GetProjectResponseDto = {
  projectId: string | null;
  boards: BoardEntity[];
};