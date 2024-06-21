export enum LocalKeys {
  CACHED_NOTES = "_cachedNotes",
  ACTIVE_NOTES = "_activeNotes",
}

export type IAppPanelDirections = "left" | "right";
export type IAppPanels = Record<IAppPanelDirections, boolean>;

export type AppFontTypes = "IBM Plex Sans" | "IBM Plex Mono";

export type AppColorMode = "light" | "dark";

export type AppOptionsProps = "settings" | "user";
export type AppOptionsDialogProps = {
  appOptionsDialog: AppOptionsProps | null;
  setAppOptionsDialog: React.Dispatch<
    React.SetStateAction<AppOptionsProps | null>
  >;
};
