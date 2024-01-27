import { PiCodeSimpleLight } from "react-icons/pi";
import { BsFillMarkdownFill } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { NodeOptions } from "src/types/node";

export const ExtensionNodes: NodeOptions[] = [
  {
    id: "code-node",
    name: "Code",
    description: "Embed code snippets in your flow",
    nodeType: "code",
    nodeContentType: "code",
    icon: <PiCodeSimpleLight size={18} />,
  },
  {
    id: "json-editor-node",
    name: "JSON Editor",
    description: "Embed and edit JSON content in your flow",
    nodeType: "json",
    nodeContentType: "json_editor",
    icon: <VscJson size={18} />,
  },
  {
    id: "markdown-editor-node",
    name: "Markdown Editor",
    description: "Embed markdown content in your flow",
    nodeType: "markdown",
    nodeContentType: "markdown",
    icon: <BsFillMarkdownFill size={18} />,
  },
];
