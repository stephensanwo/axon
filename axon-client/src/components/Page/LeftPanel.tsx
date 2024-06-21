import { Box } from "@primer/react";

function LeftPanel({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "300px",
      }}
    >
      <Body>{children}</Body>
    </Box>
  );
}

function Body({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "16px",
        display: "inline-block",
      }}
    >
      {children}
    </Box>
  );
}

LeftPanel.Body = Body;

export default LeftPanel;
