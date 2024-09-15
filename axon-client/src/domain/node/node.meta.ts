import { NodeTypes } from "./node.entity";

class NodeMetadata {
  public getNodeDimensions(type: NodeTypes): {
    nodeWidth: number;
    nodeHeight: number;
  } {
    switch (type) {
      case "icon":
        return { nodeWidth: 45, nodeHeight: 45 };
      case "block":
        return { nodeWidth: 350, nodeHeight: 350 };
      default:
        return { nodeWidth: 280, nodeHeight: 42 };
    }
  }
}

const nodeMetadata = new NodeMetadata();
export default nodeMetadata;
