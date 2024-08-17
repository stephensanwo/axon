import { UseQueryResult } from "@tanstack/react-query";
import { SettingsEntity } from "src/domain/settings/settings.entity";

export interface SettingsState {
  settings: {
    data: SettingsEntity | null;
    query: UseQueryResult<SettingsEntity, unknown>;
  };
}

export type SettingsAction = {
  type: "INIT_SETTINGS";
  payload: SettingsState;
};
