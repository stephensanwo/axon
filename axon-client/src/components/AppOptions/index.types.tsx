import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AppOptionsDialogProps, AppOptionsProps } from "src/types/app";
import AppSettings from "./AppSettings";
import UserSettings from "./UserSettings";

export const AppOptionsModals: Record<
  AppOptionsProps,
  ForwardRefExoticComponent<
    AppOptionsDialogProps & RefAttributes<HTMLButtonElement>
  >
> = {
  settings: AppSettings,
  user: UserSettings,
};
