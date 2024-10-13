import { UseQueryResult } from "@tanstack/react-query";
import {
  GetProjectResponseDto,
  GetProjectsResponseDto,
} from "src/domain/project/project.dto";

export type BaseProjectProps = {
  projectFolders: UseQueryResult<GetProjectsResponseDto | null, unknown>;
  projectFiles: UseQueryResult<GetProjectResponseDto | null, unknown>;
};
