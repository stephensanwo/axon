import React, { Fragment, useContext } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./style.scss";
import { NoteContext } from "../../context/notes";
import TextBoxNode from "./NodeTypes/TextBoxNode";
import { INode } from "src/types/notes";
import IconNode from "./NodeTypes/IconNode";
import TitleNode from "./NodeTypes/TitleNode";
import TextNode from "./NodeTypes/TextNode";

const CustomComponentNode: React.FC<INode> = ({ id, data }) => {
  const { note, setSelectedNode } = useContext(NoteContext);

  const handleNodeClick = (id: string) => {
    note.nodes?.filter((node) => {
      if (node.id === id) {
        setSelectedNode(node);
      }
    });
  };

  const handleNodeBlur = () => {
    setSelectedNode({} as INode);
  };

  return (
    <Fragment>
      {data.category === "icon-node" && (
        <IconNode
          data={data}
          selected_id={id}
          handleNodeClick={handleNodeClick}
          handleNodeBlur={handleNodeBlur}
        ></IconNode>
      )}
      {data.category === "text-node" && (
        <TextNode
          data={data}
          selected_id={id}
          handleNodeClick={handleNodeClick}
          handleNodeBlur={handleNodeBlur}
        ></TextNode>
      )}

      {data.category === "title-node" && (
        <TitleNode
          data={data}
          selected_id={id}
          handleNodeClick={handleNodeClick}
          handleNodeBlur={handleNodeBlur}
        ></TitleNode>
      )}

      {data.category === "input-node" && (
        <TextBoxNode
          data={data}
          selected_id={id}
          handleNodeClick={handleNodeClick}
          handleNodeBlur={handleNodeBlur}
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

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom_handle"
        style={{
          // top: "50%",
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "10px",
          bottom: 0,
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top_handle"
        style={{
          borderRadius: 0,
          backgroundColor: "transparent",
          width: "10px",
          bottom: 0,
        }}
      />

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
