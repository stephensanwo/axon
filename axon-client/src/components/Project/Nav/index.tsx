import { Text } from "../../Common/Text";
import { BaseProjectProps } from "../index.types";
import { ProjectLevels } from "src/context/project/project.types";
import ProjectsFolderNav from "./ProjectFoldersNav";
import ProjectsListNav from "./ProjectFilesNav";

function ProjectNav({
  level,
  projectFolders,
  projectFiles,
}: {
  level: ProjectLevels;
} & BaseProjectProps) {
  const projectNavTitle = `${projectFiles.isLoading ? "..." : projectFiles.data ? projectFiles.data.project?.name : ""}`;

  return (
    <>
      <ProjectsFolderNav
        navTitle={"Projects"}
        projectFolders={projectFolders}
        projectFiles={projectFiles}
      />
      <Text.SmallSecondary>/</Text.SmallSecondary>
      {level === "project" && (
        <ProjectsListNav
          navTitle={projectNavTitle}
          projectFolders={projectFolders}
          projectFiles={projectFiles}
        />
      )}
    </>
  );
}

export default ProjectNav;
