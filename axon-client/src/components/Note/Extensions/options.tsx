import { Code } from "@carbon/icons-react";
import { NodeOptions } from "src/types/node";
import { BsFillMarkdownFill } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
export const ExtendedNodes: NodeOptions[] = [
  {
    id: "code-node",
    name: "Code",
    description: "Embed code snippets in your flow",
    nodeType: "code",
    nodeContentType: "code",
    icon: <Code size={18} />,
  },
  {
    id: "json-editor-node",
    name: "JSON Editor",
    description: "Embed and edit JSON data in your flow",
    nodeType: "json",
    nodeContentType: "json_editor",
    icon: <VscJson size={18} />,
  },
  {
    id: "markdown-editor-node",
    name: "Markdown Editor",
    description: "Embed markdown in your flow",
    nodeType: "markdown",
    nodeContentType: "markdown",
    icon: <BsFillMarkdownFill size={18} />,
  },
];
