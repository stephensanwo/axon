import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Handle, Position } from "react-flow-renderer";

import { InlineLoading } from "@carbon/react";
import "./style.scss";
// import { FlowItemContext } from "../../pages/FlowItem/context";
import { StateColors } from "../../shared/themes";
// import { NewNodeProps } from "../NodeSelector/NodeSelectorItem";
import styled from "styled-components";
import { NoteContext } from "../../context/notes";
import { useParams } from "react-router-dom";
import { Tag } from "@carbon/react";
import { AnchorNode } from "./NodeTypes";
import TextBoxNode from "./NodeTypes/TextBoxNode";
import { INode } from "src/types/notes";

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  margin-top: 5px;
`;

const CustomComponentNode: React.FC<INode> = ({ id, data, node_styles }) => {
  // const nodeContext = useContext(FlowItemContext);
  // const { folderId, noteId } = useParams();
  // const noteData = useContext(NoteContext);
  // const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  // const note = folder.notes.filter((note) => note.id === noteId)[0];
  const { note } = useContext(NoteContext);

  const handleNodeClick = (id: string) => {
    // noteData?.setFlowSelectedNode(id);
    // console.log(id);
  };

  const handleNodeDoubleClick = () => {
    // if (noteData.openTextPanel === false) {
    //   noteData?.setOpenTextPanel(true);
    // }
  };

  console.log(data);

  return (
    <Fragment>
      {data.category === "anchor-node" && <AnchorNode data={data}></AnchorNode>}
      {data.category === "input-node" && (
        <TextBoxNode
          data={data}
          selected_id={id}
          handleNodeClick={handleNodeClick}
          handleNodeDoubleClick={handleNodeDoubleClick}
          node_styles={node_styles}
        ></TextBoxNode>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="right_handle"
        style={{
          top: "50%",
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "10px",
        }}
      />

      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="bottom_handle"
        style={{
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "100%",
          height: "10px",
          top: "100%",
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top_handle"
        style={{
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "100%",
          height: "10px",
          top: "0%",
        }}
      /> */}

      <Handle
        type="target"
        id="left_handle"
        position={Position.Left}
        style={{
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "10px",
        }}
      />
    </Fragment>
  );
};

export default CustomComponentNode;
