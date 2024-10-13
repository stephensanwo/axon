import { BaseEntity } from "src/db/db.types";

export type ProjectData = {
  name: string;
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

export enum ProjectEntityKeys {
  PROJECTS = "projects",
  PROJECT = "project",
  FOLDERS = "folders",
  FOLDER = "folder",
}
