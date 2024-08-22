import { useTheme } from "@primer/react";
import { PiAppWindowFill } from "react-icons/pi";
import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import { Document } from "src/components/Document";
import Folders from "src/components/Folders";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project, ProjectFolders } from "src/components/Project";
import { useProjectContext } from "src/context/project/hooks/useProjectContext";

function ProjectFoldersPage() {
  const { folders } = useFolderContext();
  const { projectState, projectStateDispatch } = useProjectContext();
  const { theme } = useTheme();
  const { panel, togglePanel } = usePage();
  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  const page: ComponentState = {
    // error and loading states are rendered within the DocumentFileList component
    empty: <></>,
    loading: <AxonLoader />,
    error: (
      <Page
        panel={panel}
        togglePanel={togglePanel}
        initialFocusRef={initialFocusRef}
        returnFocusRef={returnFocusRef}
        ignoreClickRefs={[]}
        header={{
          breadcrumb: (
            <Project.Nav
              level="projects"
              isLoading={projectState.projectFolders.query.isLoading}
              projectState={projectState}
              projectStateDispatch={projectStateDispatch}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={
          <Page.Left>{<Folders folders={folders} theme={theme} />}</Page.Left>
        }
        rightPanel={<Page.Right></Page.Right>}
        main={
          <Page.Main>
            {
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
          </Page.Main>
        }
        footer={
          <Page.Footer>{<Project.Footer {...projectState} />}</Page.Footer>
        }
      />
    ),
    success: (
      <Page
        panel={panel}
        togglePanel={togglePanel}
        initialFocusRef={initialFocusRef}
        returnFocusRef={returnFocusRef}
        ignoreClickRefs={[]}
        header={{
          breadcrumb: (
            <Project.Nav
              level="projects"
              isLoading={projectState.projectFolders.query.isLoading}
              projectState={projectState}
              projectStateDispatch={projectStateDispatch}
            />
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={
          <Page.Left>{<Folders folders={folders} theme={theme} />}</Page.Left>
        }
        rightPanel={<></>}
        main={
          <Page.Main>
            {
              <Project.Main>
                <ProjectFolders.Header
                  title="Projects"
                  subtitle="Manage projects"
                  projectState={projectState}
                  projectStateDispatch={projectStateDispatch}
                />
                <ProjectFolders.List
                  projectState={projectState}
                  projectStateDispatch={projectStateDispatch}
                  isLoading={projectState.projectFolders.query.isLoading}
                  initialSortColumn={
                    projectState.projectFolders.data.length > 0 ? "created" : ""
                  }
                  initialSortDirection={
                    projectState.projectFolders.data.length > 0
                      ? "DESC"
                      : undefined
                  }
                  emptyDocumentMessage={
                    <Document.Empty
                      message={
                        "You have no projects \n Create a new project to get started"
                      }
                      icon={PiAppWindowFill}
                    ></Document.Empty>
                  }
                />
              </Project.Main>
            }
          </Page.Main>
        }
        footer={
          <Page.Footer>{<Project.Footer {...projectState} />}</Page.Footer>
        }
      />
    ),
  };

  if (
    !projectState.projectFolders.query.isFetchedAfterMount &&
    projectState.projectFolders.data === null
  ) {
    return page["loading"];
  }
  if (
    projectState.projectFolders.query.isFetchedAfterMount &&
    projectState.projectFolders.data === null
  ) {
    return page["error"];
  }
  return page["success"];
}

export default ProjectFoldersPage;
