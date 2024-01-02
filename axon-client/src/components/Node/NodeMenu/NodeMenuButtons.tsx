import { NodeMenuButtonProps } from "src/types/node";
import {
  TrashCan,
  ColorPalette,
  Replicate,
  TextFont,
  Star,
  FaceAdd,
  NotebookReference,
} from "@carbon/icons-react";
import { BiBorderRadius } from "react-icons/bi";

export const ActionMenuButtons: NodeMenuButtonProps[] = [
  {
    id: "delete-node",
    name: "Delete Node",
    icon: <TrashCan size={16} />,
  },
  {
    id: "duplicate-node",
    name: "Duplicate Node",
    icon: <Replicate size={16} />,
  },
  {
    id: "set-default",
    name: "Set Default",
    icon: <Star size={16} />,
  },
];

export const DefaultMenuButtons: NodeMenuButtonProps[] = [
  {
    id: "node-theme",
    name: "Node Theme",
    icon: <ColorPalette size={16} />,
  },
  {
    id: "text-formatting",
    name: "Text Formatting",
    icon: <TextFont size={22} />,
  },
  {
    id: "node-formatting",
    name: "Node Formatting",
    icon: <BiBorderRadius size={18} />,
  },
  {
    id: "select-icon",
    name: "Select Icon",
    icon: <FaceAdd size={16} />,
  },
  {
    id: "node-content",
    name: "Node Content",
    icon: <NotebookReference size={18} />,
  },
];
