import {
  SettingsAction,
  SettingsState,
} from "src/context/settings/settings.types";

export type BaseSettingsProps = {
  settingsState: SettingsState;
  settingsStateDispatch: React.Dispatch<SettingsAction>;
};
