import { Box } from "@primer/react";
import Colors from "./Colors";
import ColorMode from "./ColorMode";

function AppTheme(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <ColorMode />
      <Colors />
    </Box>
  );
}

export default AppTheme;
