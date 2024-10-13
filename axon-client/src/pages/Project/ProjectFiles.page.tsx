import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project, ProjectFiles } from "src/components/Project";
import Layout from "src/components/Layout";
import { useProject } from "src/context/project/hooks/useProject";

function ProjectFilesPage() {
  const { projectFolders, projectFiles } = useProject();

  if (projectFiles.isLoading) {
    return <AxonLoader />;
  }

  if (projectFiles.isFetchedAfterMount && projectFiles.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Project.Nav
              level="project"
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        middleTopPanel={
          <Project.Main>
            <Blank
              heading="Project not found"
              description={`The project you are looking for does not exist\n or has been deleted.`}
              type="error"
              action={{
                label: "Go to Projects",
                href: "/projects",
              }}
            />
          </Project.Main>
        }
      />
    );
  }

  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <Project.Nav
            level="project"
            projectFolders={projectFolders}
            projectFiles={projectFiles}
          />
        ),
        menus: [
          <Search.Button type={"icon"} />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={
        projectFiles.data && (
          <Project.Main>
            <ProjectFiles.Header
              title={`Projects / ${projectFiles.isLoading ? "..." : projectFiles.data.project?.name}`}
              subtitle="Create, delete and manage boards"
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
            <ProjectFiles.List
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
          </Project.Main>
        )
      }
    />
  );
}

export default ProjectFilesPage;
