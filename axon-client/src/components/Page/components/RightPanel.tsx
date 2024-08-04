import { Box, useTheme } from "@primer/react";

function RightPanel({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "600px",
        // borderTop: `1px solid ${theme?.colors.border.default}`,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default RightPanel;
