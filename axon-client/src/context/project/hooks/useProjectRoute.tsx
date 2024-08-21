import { useParams } from "react-router-dom";
import { ProjectRouteParams } from "../project.types";

export function useProjectRoute(): {
  projectName: string | undefined;
} {
  const { projectName } = useParams<ProjectRouteParams>();

  return { projectName };
}
