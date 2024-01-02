import { CustomNodeProps, NodeDataProps, NodeMenuEvents } from "src/types/node";
import SelectIcon from "./SelectIconMenu";
import NodeThemeMenu from "./NodeThemeMenu";
import NodeTextFormatting from "./NodeTextFormatting";
import NodeFormatting from "./NodeFormatting";

export const nodeMenuRouter: Partial<
  Record<NodeMenuEvents, React.FC<CustomNodeProps<NodeDataProps>>>
> = {
  "node-theme": NodeThemeMenu,
  "text-formatting": NodeTextFormatting,
  "node-formatting": NodeFormatting,
  "select-icon": SelectIcon,
};

export const NodeMenuDropdown: React.FC<{
  nodeMenu: NodeMenuEvents | null;
  node_props: CustomNodeProps<NodeDataProps>;
}> = (props) => {
  const { nodeMenu, node_props } = props;
  const Dropdown = nodeMenu !== null ? nodeMenuRouter[nodeMenu] : null;
  return Dropdown ? <Dropdown {...node_props} /> : null;
};
