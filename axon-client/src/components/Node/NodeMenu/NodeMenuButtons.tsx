import {
  PiTrashSimpleLight,
  PiCopySimpleLight,
  PiStarLight,
  PiPalette,
  PiTextAUnderline,
  PiNotebookLight,
  PiSmileyLight,
} from "react-icons/pi";
import { BiBorderRadius } from "react-icons/bi";
import { NodeMenuButtonProps } from "src/types/node";

export const ActionMenuButtons: NodeMenuButtonProps[] = [
  {
    id: "delete-node",
    name: "Delete Node",
    icon: <PiTrashSimpleLight size={18} />,
  },
  {
    id: "duplicate-node",
    name: "Duplicate Node",
    icon: <PiCopySimpleLight size={18} />,
  },
  {
    id: "set-default",
    name: "Set Default",
    icon: <PiStarLight size={18} />,
  },
];

export const DefaultMenuButtons: NodeMenuButtonProps[] = [
  {
    id: "node-theme",
    name: "Node Theme",
    icon: <PiPalette size={18} />,
  },
  {
    id: "text-formatting",
    name: "Text Formatting",
    icon: <PiTextAUnderline size={20} />,
  },
  {
    id: "node-formatting",
    name: "Node Formatting",
    icon: <BiBorderRadius size={18} />,
  },
  {
    id: "select-icon",
    name: "Select Icon",
    icon: <PiSmileyLight size={18} />,
  },
  {
    id: "node-content",
    name: "Node Content",
    icon: <PiNotebookLight size={18} />,
  },
];
