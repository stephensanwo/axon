import { UseQueryResult } from "@tanstack/react-query";
import { ProjectEntity } from "src/domain/project/project.entity";

export type ProjectState = {
  data: ProjectEntity[];
  query: UseQueryResult<ProjectEntity[], unknown>;
};

export type ProjectAction = {
  type: "INIT_PROJECTS";
  payload: {
    documentFolders: ProjectEntity[];
    query: UseQueryResult<ProjectEntity[], unknown>;
  };
};
