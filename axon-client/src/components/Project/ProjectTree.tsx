import React from "react";
import { BaseProjectProps } from "./index.types";
import { Box, TreeView, useTheme } from "@primer/react";
import { FileIcon } from "@primer/octicons-react";
import Icon from "src/components/Common/Icon";
import { Text } from "src/components/Common/Text";
import { PiPlus } from "react-icons/pi";

function ProjectTree({ projectState }: BaseProjectProps) {
  const { theme } = useTheme();
  return (
    <>
      <TreeView.Item id="projects">
        <Text.Heading6Secondary>Projects</Text.Heading6Secondary>
        <TreeView.SubTree>
          <TreeView.Item id={`projects/new-project`}>
            <TreeView.LeadingVisual>
              <PiPlus fill={theme?.colors.primary.default} />
            </TreeView.LeadingVisual>
            <Text.SmallSecondary
              sx={{
                color: theme?.colors.primary.default,
              }}
            >
              New Project
            </Text.SmallSecondary>
          </TreeView.Item>
          {Object.values(projectState.projectFolders.projectTree).map(
            (project, index) => (
              <TreeView.Item key={index} id={`projects/${project.name}`}>
                <TreeView.LeadingVisual>
                  <Icon.Project />
                </TreeView.LeadingVisual>
                <Text.SmallSecondary>{project.name}</Text.SmallSecondary>
                <TreeView.SubTree>
                  <TreeView.Item id={`projects/new-project`}>
                    <TreeView.LeadingVisual>
                      <PiPlus fill={theme?.colors.primary.default} />
                    </TreeView.LeadingVisual>
                    <Text.SmallSecondary
                      sx={{
                        color: theme?.colors.primary.default,
                      }}
                    >
                      New Board
                    </Text.SmallSecondary>
                  </TreeView.Item>
                  {Object.values(project.boards).map((board, index) => (
                    <TreeView.Item
                      key={index}
                      id={`projects/${project.name}/${board.name}`}
                    >
                      <TreeView.LeadingVisual>
                        <Icon.Board />
                      </TreeView.LeadingVisual>
                      <Text.SmallSecondary>{board.name}</Text.SmallSecondary>
                    </TreeView.Item>
                  ))}
                </TreeView.SubTree>
              </TreeView.Item>
            )
          )}
        </TreeView.SubTree>
      </TreeView.Item>
    </>
  );
}

export default ProjectTree;
