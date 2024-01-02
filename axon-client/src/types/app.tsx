import { IDefaultNodeSettings } from "./notes";

export interface IAppSettings {
  grid: boolean;
  default_node_settings: IDefaultNodeSettings;
}

export enum LocalKeys {
  CACHED_NOTES = "_cachedNotes",
  ACTIVE_NOTES = "_activeNotes",
}
