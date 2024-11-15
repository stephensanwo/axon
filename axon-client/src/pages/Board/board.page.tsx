import Blank from "src/components/Blank";
import AxonLoader from "src/components/Loader/Loader";
import SearchDialog from "src/components/Search/SearchDialog";
import Settings from "src/components/Settings";
import User from "src/components/User";
import { Project } from "src/components/Project";
import Board from "src/components/Board";
import { Text } from "src/components/Common/Text";
// import FlowTree from "src/components/FlowTree";
import { useBoard } from "src/context/board/hooks/useBoard";
import Layout from "src/components/Layout";
import { useProject } from "src/context/project/hooks/useProject";
import { useBoardStore } from "src/context/board/board.store";
import { useInitFlow } from "src/context/board/hooks/useInitFlow";
import Flow from "src/components/Flow";
import NodeContent from "src/components/NodeContent";
import { useTheme } from "@primer/react";
import NodeOptions from "src/components/NodeOptions";

function BoardPage() {
  const { board } = useBoard();
  const { nodeOptions, toggleNodeOptions, nodeContent, toggleNodeContent } =
    useBoardStore();
  const { projectFolders, projectFiles } = useProject();
  const { theme } = useTheme();

  if (board.isLoading) {
    return <AxonLoader />;
  }

  if (!board.data) {
    <Layout
      pageHeader={{
        breadcrumb: (
          <>
            <Project.Nav
              level="project"
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
            <Text.SmallSecondary>/</Text.SmallSecondary>
            <Board.Nav board={board} />
          </>
        ),
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: true,
        component: (
          <Board.Main>
            <Blank
              heading="Board not found"
              description={`The board you are looking for does not exist\n or has been deleted.`}
              type="error"
              action={{
                label: "Go to Projects",
                href: "/projects",
              }}
            />
          </Board.Main>
        ),
      }}
    />;
  }

  console.log("board", board.data);
  return (
    <Layout
      pageHeader={{
        breadcrumb: (
          <>
            <Project.Nav
              level="project"
              projectFolders={projectFolders}
              projectFiles={projectFiles}
            />
            <Text.SmallSecondary>/</Text.SmallSecondary>
            <Board.Nav board={board} />
          </>
        ),
        menus: [
          <SearchDialog />,
          <Settings.Button type="icon" />,
          <User.Button type={"icon"} />,
        ],
      }}
      middleTopPanel={{
        enabled: nodeOptions.state === "open",
        defaultSize: 15,
        minSize: 15,
        maxSize: 15,
        collapsible: false,
        component: <NodeOptions.Panel nodeOptions={nodeOptions} />,
      }}
      leftPanel={{
        enabled: true,
        component: (
          <Board.Main>
            <Flow
              initialNodes={board.data?.nodes ?? []}
              initialEdges={board.data?.edges ?? []}
            />
            {/* <FlowTree /> */}
          </Board.Main>
        ),
        styles: {
          padding: "0px",
          borderRight:
            nodeOptions.state === "closed"
              ? "none"
              : `1px solid ${theme?.colors.border.default}`,
        },
      }}
      rightPanel={{
        enabled: nodeContent.state === "open",
        defaultSize: 50,
        minSize: 50,
        maxSize: 50,
        collapsible: false,
        component: (
          <NodeContent
            nodeContent={nodeContent}
            toggleNodeContent={toggleNodeContent}
          />
        ),
      }}
    />
  );
}

export default BoardPage;
