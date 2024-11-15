import { Edge, Node } from "reactflow";
import { EdgeEntity } from "src/domain/edge/edge.entity";
import { NodeEntity } from "src/domain/node/node.entity";

export type FlowProps = {
  initialNodes: NodeEntity[];
  initialEdges: EdgeEntity[];
};
