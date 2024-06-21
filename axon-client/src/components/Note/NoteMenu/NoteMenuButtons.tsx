import { NoteMenuProps } from "src/types/notes";
import {
  PiNotebookLight,
  PiTreeStructureLight,
  PiShareFatLight,
  PiCubeLight,
} from "react-icons/pi";
import { CiSettings, CiMaximize2 } from "react-icons/ci";

export const NoteMenuButtons: NoteMenuProps[] = [
  {
    id: "content",
    menuType: "content",
    name: "Content",
    description: "Toggle content view",
    icon: <PiNotebookLight size={18} />,
    disabled: false,
  },
  {
    id: "tree",
    menuType: "tree",
    name: "Node Tree",
    description: "Toggle node tree",
    icon: <PiTreeStructureLight size={18} />,
    disabled: false,
  },
  {
    id: "publish",
    menuType: "publish",
    name: "Publish",
    description: "Toggle note publish",
    icon: <PiShareFatLight size={18} />,
    disabled: false,
  },
  {
    id: "extensions",
    menuType: "extensions",
    name: "Extansions",
    description: "Toggle extensions",
    icon: <PiCubeLight size={18} />,
    disabled: false,
  },
  {
    id: "settings",
    menuType: "settings",
    name: "Settings",
    description: "Toggle note settings",
    icon: <CiSettings size={18} />,
    disabled: false,
  },
  {
    id: "fullscreen",
    menuType: "fullscreen",
    name: "FullScreen",
    description: "Toggle fullscreen",
    icon: <CiMaximize2 size={18} />,
    disabled: false,
  },
];
