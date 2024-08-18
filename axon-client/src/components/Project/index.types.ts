import { ProjectAction, ProjectState } from "src/context/project/project.types";

export type BaseProjectProps = {
  projectState: ProjectState;
  projectStateDispatch: React.Dispatch<ProjectAction>;
};
