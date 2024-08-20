import { BaseEntity } from "src/db/db.types";

export type ProjectData = {
  name: string;
  description: string;
  pinned: boolean;
};
export type ProjectEntity = BaseEntity & ProjectData;

export const ProjectQueryKeys = {
  PROJECTS: ["projects"],
} satisfies Record<string, string[]>;
