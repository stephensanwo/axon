import NoteSettings from "src/components/NoteSettings";
import { NoteMenuModalKeys } from "./index.types";
import PublishNote from "src/components/PublishNote";
import Extensions from "src/components/Extensions";

export const NoteModals: Record<NoteMenuModalKeys, React.ElementType> = {
  settings: NoteSettings,
  tree: NoteSettings,
  publish: PublishNote,
  extensions: Extensions,
};
