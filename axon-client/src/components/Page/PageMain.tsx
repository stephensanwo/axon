import { Box } from "@primer/react";
import React from "react";

function PageMain({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: "100vw",
        position: "absolute",
        bottom: 0,
        height: `calc(100vh - 48px)`,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default PageMain;
