import React from "react";
import { BaseProjectProps } from "../index.types";
import { Box, Button, useTheme } from "@primer/react";
import { Text } from "src/components/Common/Text";
import { PiFolderSimpleFill, PiPlusLight } from "react-icons/pi";

function ProjectRecents({
  projectState,
  projectStateDispatch,
}: BaseProjectProps) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        height: "240px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        variant="invisible"
        sx={{
          height: "180px",
          minWidth: "240px",
          borderRadius: 2,
          border: `1px solid ${theme?.colors.border.default}`,
          ":hover": {
            backgroundColor: "transparent",
            border: `1px solid ${theme?.colors.border.default}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PiPlusLight size={64} color={theme?.colors.border.default} />
          <Text.SmallSecondary>New Project</Text.SmallSecondary>
        </Box>
      </Button>

      <Button
        variant="invisible"
        sx={{
          height: "200px",
          minWidth: "240px",
          borderRadius: 2,

          ":hover": {
            backgroundColor: "transparent",
            border: `1px solid ${theme?.colors.border.default}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PiFolderSimpleFill size={64} color={theme?.colors.border.default} />
          <Text.SmallSecondary>Project Odin</Text.SmallSecondary>
        </Box>
      </Button>
    </Box>
  );
}

export default ProjectRecents;
