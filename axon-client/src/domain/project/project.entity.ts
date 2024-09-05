import { BaseEntity } from "src/db/db.types";

export type ProjectData = {
  name: string;
  description: string;
  pinned: boolean;
};
export type ProjectEntity = BaseEntity & ProjectData;

export type ProjectTreeData = { id: string; name: string };

export type ProjectTreeEntity = Record<
  string,
  ProjectTreeData & {
    boards: Record<string, ProjectTreeData>;
  }
>;

export const ProjectQueryKeys = {
  PROJECTS: ["projects"],
  PROJECT_FILES: ["projects", "files"],
} satisfies Record<string, string[]>;
