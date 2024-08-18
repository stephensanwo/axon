import { useTheme } from "@primer/react";
import { PiFolder } from "react-icons/pi";
import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import { Document, DocumentFolder } from "src/components/Document";
import DocumentNav from "src/components/Document/Nav";
import Folders from "src/components/Folders";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { useDocumentContext } from "src/context/document/hooks/useDocumentContext";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import ProjectNav from "src/components/Project/components/ProjectNav";
import { Text } from "src/components/Common/Text";
import { Project } from "src/components/Project";
import { useProjectContext } from "src/context/project/hooks/useProjectContext";

function ProjectPage() {
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
            <>
              <Project.Nav
                navTitle="Projects"
                projectState={projectState}
                projectStateDispatch={projectStateDispatch}
              />
              <Text.SmallSecondary>/</Text.SmallSecondary>
            </>
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
            <>
              <Project.Nav
                navTitle="Projects"
                projectState={projectState}
                projectStateDispatch={projectStateDispatch}
              />
              <Text.SmallSecondary>/</Text.SmallSecondary>
            </>
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
                <Project.Header
                  title="Projects"
                  subtitle="Manage projects"
                  projectState={projectState}
                  projectStateDispatch={projectStateDispatch}
                />
                <Project.List
                  projectState={projectState}
                  projectStateDispatch={projectStateDispatch}
                  isLoading={projectState.query.isLoading}
                  initialSortColumn={
                    projectState.data.length > 0 ? "created" : ""
                  }
                  initialSortDirection={
                    projectState.data.length > 0 ? "DESC" : undefined
                  }
                  emptyDocumentMessage={
                    <Document.Empty
                      message={
                        "You have no projects \n Create a new project to get started"
                      }
                      icon={PiFolder}
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

  if (!projectState.query.isFetchedAfterMount && projectState.data === null) {
    return page["loading"];
  }
  if (projectState.query.isFetchedAfterMount && projectState.data === null) {
    return page["error"];
  }
  return page["success"];
}

export default ProjectPage;
