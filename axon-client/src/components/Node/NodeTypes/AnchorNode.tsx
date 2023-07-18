import React from "react";
import { NodeDataProps } from "src/types/notes";

interface AnchorNodeData {
  data: NodeDataProps;
}

const AnchorNode: React.FC<AnchorNodeData> = (props) => {
  return (
    <div className="anchor-node-container">
      <div className="anchor-node-label">{props.data.title}</div>
    </div>
  );
};

export default AnchorNode;
