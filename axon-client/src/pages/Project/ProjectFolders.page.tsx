import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project, ProjectFolders } from "src/components/Project";
import Icon from "src/components/Common/Icon";
import { useProject } from "src/context/project/hooks/useProject";
import Layout from "src/components/Layout";

function ProjectFoldersPage() {
  const { projectFolders, projectFiles } = useProject();

  if (projectFolders.isLoading) {
    return <AxonLoader />;
  }

  if (projectFolders.isFetchedAfterMount && projectFolders.data === null) {
    return (
      <Layout
        pageHeader={{
          breadcrumb: (
            <Project.Nav
              level="projects"
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
              heading="Unable to load projects"
              description={`An error occurred while loading projects\n Please try again later.`}
              type="error"
              action={{
                label: "Try again",
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
            level="projects"
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
        projectFolders.data?.projects && (
          <Project.Main>
            <ProjectFolders.Header
              title="Projects"
              subtitle="Manage document folders"
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
            <ProjectFolders.List
              projectFolders={projectFolders}
              projectFiles={projectFiles}
              initialSortColumn={
                projectFolders.data?.projects.length!! > 0 ? "created" : ""
              }
              initialSortDirection={
                projectFolders.data?.projects.length!! > 0 ? "DESC" : undefined
              }
              emptyDocumentMessage={
                <Project.Empty
                  message={
                    "You have no projects \n Create a new project to get started"
                  }
                  icon={Icon.Project}
                ></Project.Empty>
              }
            />
          </Project.Main>
        )
      }
    />
  );
}

export default ProjectFoldersPage;
