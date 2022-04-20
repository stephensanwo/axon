import React, { Fragment, useContext } from "react";
import { Handle, Position } from "react-flow-renderer";
import {
  Code24,
  DataBase24,
  Cloud24,
  BareMetalServer24,
  ApplicationWeb24,
  Notebook24,
} from "@carbon/icons-react";
import { InlineLoading } from "carbon-components-react";
import "./style.scss";
// import { FlowItemContext } from "../../pages/FlowItem/context";
import { StateColors } from "../../shared/themes";
// import { NewNodeProps } from "../NodeSelector/NodeSelectorItem";
import styled from "styled-components";
import { NoteContext } from "../../context/notes";
import { useParams } from "react-router-dom";
import { Tag } from "carbon-components-react";

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  margin-top: 5px;
`;

const CustomComponentNode: React.FC<any> = ({ id, data, position, handle }) => {
  // const nodeContext = useContext(FlowItemContext);
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  const note = folder.notes.filter((note) => note.id === noteId)[0];

  const handleNodeClick = (id: string) => {
    noteData?.setFlowSelectedNode(id);
    console.log(id);
  };

  const handleNodeDoubleClick = () => {
    if (noteData.openTextPanel === false) {
      noteData?.setOpenTextPanel(true);
    }
  };

  return (
    <Fragment>
      {data.node_category === "simple-node" ? (
        <div className="simple-node-container">
          <div className="simple-node-label">{data.title}</div>
        </div>
      ) : (
        <div
          className={`node-container`}
          onClick={() => handleNodeClick(id)}
          onDoubleClick={handleNodeDoubleClick}
        >
          <div className="node-content">
            <div style={{ padding: 0 }}>
              <div className="node-label">{data.label}</div>
              <h5 style={{ textAlign: "left" }}>{data.title}</h5>

              <div className="node-description">
                {`${data.description}`.slice(0, 120)}
                {data.description.length > 120 ? "..." : ""}
              </div>
            </div>
            <div>
              {data.node_type === "database" ? (
                <DataBase24 fill={StateColors.open} />
              ) : data.node_type === "cloud" ? (
                <Cloud24 fill={StateColors.open} />
              ) : data.node_type === "server" ? (
                <BareMetalServer24 fill={StateColors.open} />
              ) : data.node_type === "client" ? (
                <ApplicationWeb24 fill={StateColors.open} />
              ) : data.node_type === "note" ? (
                <Notebook24 fill={StateColors.open} />
              ) : (
                <Code24 fill={StateColors.open} />
              )}
            </div>
          </div>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: "50%", borderRadius: 0 }}
      />

      <Handle
        type="target"
        position={Position.Left}
        style={{ borderRadius: 0 }}
      />
    </Fragment>
  );
};

export default CustomComponentNode;
