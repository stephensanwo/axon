import { Box, useTheme } from "@primer/react";
import React from "react";

function PageFooter({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "green",
        width: "100vw",
        position: "absolute",
        bottom: 0,
        height: "32px",
        display: "inline-flex",
        alignItems: "center",
        borderTop: `1px solid ${theme?.colors.border.default}`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PageFooter;
