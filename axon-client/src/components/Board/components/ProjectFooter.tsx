import { Box, Button, useTheme } from "@primer/react";
import { PiArrowsClockwise } from "react-icons/pi";
import { Text } from "src/components/Common/Text";
import OverlayMenu from "src/components/Common/OverlayMenu";
import { ProjectState } from "src/context/project/project.types";

function ProjectFooter(projectState: ProjectState) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Text.SmallSecondary>
          Documents: {projectState.projectFolders.projects.length}
        </Text.SmallSecondary>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box>
          <OverlayMenu
            width={400}
            minHeight={500}
            side="outside-top"
            align="center"
            anchorOffset={10}
            alignmentOffset={16}
            anchorComponent={
              <Button
                leadingVisual={() => (
                  <PiArrowsClockwise color={theme?.colors.text.gray} />
                )}
                sx={{
                  height: "31px",
                  minWidth: "48px",
                  borderRadius: 0,
                }}
                variant="invisible"
              >
                <Text.SmallSecondary>Document Status</Text.SmallSecondary>
              </Button>
            }
            heading={<Text.Heading4>Document Status</Text.Heading4>}
          >
            <Text.Small>
              This is an overlay menu. It will close when you click outside of
              it.
            </Text.Small>
          </OverlayMenu>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectFooter;
