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
    case "NEW_COLOR": {
      return {
        ...state,
        settings: {
          ...state.settings,
          data: {
            ...state.settings.data,
            colors: [...state.settings.data.colors, action.payload],
          },
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
