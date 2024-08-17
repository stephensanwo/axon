import { SettingsAction, SettingsState } from "./settings.types";

export function settingsReducer(
  state: SettingsState,
  action: SettingsAction
): SettingsState {
  switch (action.type) {
    case "INIT_SETTINGS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
