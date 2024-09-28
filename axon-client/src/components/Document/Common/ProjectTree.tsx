import React from "react";
import { BaseProjectProps } from "../index.types";
import { Box, TreeView, useTheme } from "@primer/react";
import { FileIcon } from "@primer/octicons-react";
import Icon from "src/components/Common/Icon";
import { Text } from "src/components/Common/Text";

function ProjectTree({ projectState }: BaseProjectProps) {
  const { theme } = useTheme();
  return (
    <>
      <TreeView.Item id="projects" defaultExpanded>
        <TreeView.LeadingVisual>
          <Icon.Project size={14} />
        </TreeView.LeadingVisual>
        <Text.Heading6Secondary>Projects</Text.Heading6Secondary>
        <TreeView.SubTree>
          <TreeView.Item id="src/Avatar.tsx">
            <TreeView.LeadingVisual>
              <FileIcon />
            </TreeView.LeadingVisual>
            Avatar.tsx
          </TreeView.Item>
          <TreeView.Item id="src/Button" current>
            <TreeView.LeadingVisual>
              <TreeView.DirectoryIcon />
            </TreeView.LeadingVisual>
            Button
            <TreeView.SubTree>
              <TreeView.Item id="src/Button/Button.tsx">
                <TreeView.LeadingVisual>
                  <FileIcon />
                </TreeView.LeadingVisual>
                Button.tsx
              </TreeView.Item>
              <TreeView.Item id="src/Button/Button.test.tsx">
                <TreeView.LeadingVisual>
                  <FileIcon />
                </TreeView.LeadingVisual>
                Button.test.tsx
              </TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>
          <TreeView.Item id="src/ReallyLongFileNameThatShouldBeTruncated.tsx">
            <TreeView.LeadingVisual>
              <FileIcon />
            </TreeView.LeadingVisual>
            ReallyLongFileNameThatShouldBeTruncated.tsx
          </TreeView.Item>
        </TreeView.SubTree>
      </TreeView.Item>
    </>
  );
}

export default ProjectTree;
