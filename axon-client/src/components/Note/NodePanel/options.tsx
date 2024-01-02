import { Image } from "@carbon/icons-react";
import { TextCreation, FaceActivated, Link, Area } from "@carbon/icons-react";
import { NodeOptions } from "src/types/node";
import { PiTextT } from "react-icons/pi";
import { LuTextSelect } from "react-icons/lu";

export const DefaultNodes: NodeOptions[] = [
  {
    id: "add-text-node",
    name: "Text",
    description: "Add text content to your flow",
    nodeType: "text",
    nodeContentType: "block_editor",
    icon: <TextCreation size={22} />,
  },
  {
    id: "add-block-node",
    name: "Block",
    description: "Add text block to your flow",
    nodeType: "block",
    nodeContentType: "block_editor",
    icon: <LuTextSelect size={22} />,
  },
  {
    id: "add-paragraph",
    name: "Paragraph",
    description: "Add a paragraph to your flow",
    nodeType: "paragraph",
    nodeContentType: null,
    icon: <PiTextT size={22} />,
  },
  {
    id: "add-icon-node",
    name: "Icon",
    description: "Add an icon to your flow",
    nodeType: "icon",
    nodeContentType: "block_editor",
    icon: <FaceActivated size={18} />,
  },
  {
    id: "add-boundary-box",
    name: "Bounding Box",
    description: "Add a bounding box to group nodes",
    nodeType: "bounding_box",
    nodeContentType: "block_editor",
    icon: <Area size={20} />,
  },
  {
    id: "add-image-node",
    name: "Image",
    description: "Embed SVG, JPG, PNG etc. images from url",
    nodeType: "image",
    nodeContentType: "block_editor",
    icon: <Image size={20} />,
  },
  {
    id: "add-link-node",
    name: "Link",
    description: "Embed a website in your flow",
    nodeType: "link",
    nodeContentType: "block_editor",
    icon: <Link size={18} />,
  },
];
