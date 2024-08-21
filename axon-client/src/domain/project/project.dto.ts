import { BaseEntity } from "src/db/db.types";
import { ProjectData } from "./project.entity";
import { FlowEntity } from "../flow/flow.entity";

export type CreateProjectDto = ProjectData;

export type UpdateProjectDto = BaseEntity & ProjectData;

export type GetProjectResponseDto = {
  projectId: string | null;
  flows: FlowEntity[];
};