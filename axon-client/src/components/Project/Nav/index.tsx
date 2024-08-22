import { Text } from "../../Common/Text";
import { BaseProjectProps } from "../index.types";
import { ProjectLevels } from "src/context/project/project.types";
import ProjectsFolderNav from "./ProjectFoldersNav";
import ProjectsListNav from "./ProjectFilesNav";

function ProjectNav({
  level,
  isLoading,
  projectState,
  projectStateDispatch,
}: {
  level: ProjectLevels;
  isLoading: boolean;
} & BaseProjectProps) {
  const projectNavTitle = `${isLoading ? "..." : projectState.projectFiles.project?.name}`;

  return (
    <>
      <ProjectsFolderNav
        navTitle={"Projects"}
        projectState={projectState}
        projectStateDispatch={projectStateDispatch}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "project" && (
        <ProjectsListNav
          navTitle={projectNavTitle}
          projectState={projectState}
          projectStateDispatch={projectStateDispatch}
        />
      )}
    </>
  );
}

export default ProjectNav;
