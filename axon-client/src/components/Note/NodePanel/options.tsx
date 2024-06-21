import { PiTextTLight } from "react-icons/pi";
import { CiGlobe, CiImageOn } from "react-icons/ci";
import {
  PiSelectionLight,
  PiSmileyLight,
  PiStackLight,
  PiArticleLight,
} from "react-icons/pi";
import { NodeOptions } from "src/types/node";

export const DefaultNodes: NodeOptions[] = [
  {
    id: "add-text-node",
    name: "Text",
    description: "Add text content to your flow",
    nodeType: "text",
    nodeContentType: "block_editor",
    icon: <PiArticleLight size={18} />,
  },
  {
    id: "add-block-node",
    name: "Block",
    description: "Add text block to your flow",
    nodeType: "block",
    nodeContentType: "block_editor",
    icon: <PiStackLight size={18} />,
  },
  {
    id: "add-paragraph",
    name: "Paragraph",
    description: "Add a paragraph to your flow",
    nodeType: "paragraph",
    nodeContentType: null,
    icon: <PiTextTLight size={18} />,
  },
  {
    id: "add-icon-node",
    name: "Icon",
    description: "Add an icon to your flow",
    nodeType: "icon",
    nodeContentType: "block_editor",
    icon: <PiSmileyLight size={18} />,
  },
  {
    id: "add-boundary-box",
    name: "Bounding Box",
    description: "Add a bounding box to group nodes",
    nodeType: "bounding_box",
    nodeContentType: "block_editor",
    icon: <PiSelectionLight size={18} />,
  },
  {
    id: "add-image-node",
    name: "Image",
    description: "Embed SVG, JPG, PNG etc. images from url",
    nodeType: "image",
    nodeContentType: "block_editor",
    icon: <CiImageOn size={18} />,
  },
  {
    id: "add-link-node",
    name: "Link",
    description: "Embed a link in your flow",
    nodeType: "link",
    nodeContentType: "block_editor",
    icon: <CiGlobe size={18} />,
  },
  {
    id: "markdown-editor-node",
    name: "Markdown Editor",
    description: "Embed markdown content in your flow",
    nodeType: "json",
    nodeContentType: "json_editor",
    icon: <CiGlobe size={18} />,
  },
];
