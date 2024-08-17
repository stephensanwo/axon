import { Box } from "@primer/react";
import ColorList from "./ColorList";
import { useSettingsContext } from "src/context/settings/hooks/useSettingsContext";

function AppColors(): JSX.Element {
  const { settingsState } = useSettingsContext();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ColorList settingsState={settingsState} />
    </Box>
  );
}

export default AppColors;
