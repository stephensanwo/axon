import { Box } from "@primer/react";
import ColorList from "./ColorList";
import { BaseSettingsProps } from "../../index.types";

function AppColors({
  settingsState,
  settingsStateDispatch,
}: BaseSettingsProps): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ColorList
        settingsState={settingsState}
        settingsStateDispatch={settingsStateDispatch}
      />
    </Box>
  );
}

export default AppColors;
