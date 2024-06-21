import { NoteMenuTypes } from "src/types/notes";

export type NoteMenuActionTypes = "panel" | "modal" | "custom";

export type NoteMenuModalKeys = Exclude<
  NoteMenuTypes,
  "content" | "fullscreen"
> & {};
