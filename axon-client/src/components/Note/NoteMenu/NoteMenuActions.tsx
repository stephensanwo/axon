import { NoteMenuTypes } from "src/types/notes";
import { NoteMenuActionTypes } from "./index.types";

export const NoteMenuActions: Record<NoteMenuTypes, NoteMenuActionTypes> = {
  settings: "modal",
  tree: "modal",
  publish: "modal",
  extensions: "modal",
  fullscreen: "custom",
  content: "panel",
};
