import React from "react";
import { NodeDataProps } from "../../../context/notes";
import { NodeThemes } from "../../../shared/themes";

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
