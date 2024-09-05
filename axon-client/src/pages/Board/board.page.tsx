import { useTheme } from "@primer/react";
import Blank from "src/components/Blank";
import { ComponentState } from "src/components/Common/ComponentState";
import Folders from "src/components/Folders";
import AxonLoader from "src/components/Loader/Loader";
import Page from "src/components/Page";
import { useFolderContext } from "src/hooks/folders/useFolderContext";
import { usePage } from "src/context/page/hooks/usePage";
import { useRef } from "react";
import Search from "src/components/Search";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project } from "src/components/Project";
import { useProjectContext } from "src/context/project/hooks/useProjectContext";
import Board from "src/components/Board";
import { Text } from "src/components/Common/Text";
import { useBoardContext } from "src/context/board/hooks/useBoardContext";
import NodePanel from "src/components/Note/NodePanel";
import Nav from "src/components/Nav";
import FlowTree from "src/components/FlowTree";

function BoardPage() {
  const { folders } = useFolderContext();
  const { projectState, projectStateDispatch } = useProjectContext();
  const { boardState, boardStateDispatch } = useBoardContext();
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
                level="project"
                isLoading={projectState.projectFiles.query.isLoading}
                projectState={projectState}
                projectStateDispatch={projectStateDispatch}
              />
              <Text.SmallSecondary>/</Text.SmallSecondary>
              <Board.Nav
                isLoading={boardState.boardQuery.isLoading}
                boardState={boardState}
                boardStateDispatch={boardStateDispatch}
              />
            </>
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={<Page.Right></Page.Right>}
        main={
          <Page.Main>
            {
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
                level="project"
                isLoading={projectState.projectFiles.query.isLoading}
                projectState={projectState}
                projectStateDispatch={projectStateDispatch}
              />
              <Text.SmallSecondary>/</Text.SmallSecondary>
              <Board.Nav
                isLoading={boardState.boardQuery.isLoading}
                boardState={boardState}
                boardStateDispatch={boardStateDispatch}
              />
            </>
          ),
          menus: [
            <Search.Button type={"icon"} />,
            <Settings.Button type="icon" />,
            <User.Button type={"icon"} />,
          ],
        }}
        leftPanel={<Page.Left>{<Nav />}</Page.Left>}
        rightPanel={<></>}
        main={
          <Page.Main>
            {
              <Project.Main>
                <NodePanel />
                <FlowTree />
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

  if (!boardState.boardQuery.isFetchedAfterMount && boardState.board === null) {
    return page["loading"];
  }
  if (boardState.boardQuery.isFetchedAfterMount && boardState.board === null) {
    return page["error"];
  }
  return page["success"];
}

export default BoardPage;
