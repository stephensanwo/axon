import { BaseEntity } from "src/db/db.types";
import { ProjectData } from "./project.entity";

export type CreateProjectDto = ProjectData;

export type UpdateProjectDto = BaseEntity & ProjectData;
