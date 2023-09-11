export enum ILoadingStateTypes {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ILoadingState {
  loading: boolean;
  success: boolean;
  error: boolean;
}

export interface IAppSettings {
  grid: boolean;
}

export enum LocalKeys {
  LAST_NOTE_ID = "lastNoteId",
  LAST_FOLDER_ID = "lastFolderId",
}