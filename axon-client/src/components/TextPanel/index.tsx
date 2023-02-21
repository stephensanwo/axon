import { HeaderPanel } from "@carbon/react";
import { useParams } from "react-router-dom";
import { NodeProps, NoteContext } from "../../context/notes";
import React, { Fragment, useContext, useEffect, useState } from "react";
import "./style.scss";
import MarkdownNotes from "../MarkdownNotes";

interface Props {
  expanded: boolean;
}

const TextPanel: React.FC<Props> = (props) => {
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);
  const [selectedNode, setSelectedNode] = useState<NodeProps>();
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  const note = folder.notes.filter((note) => note.id === noteId)[0];
  //   const selectedNode = note.nodes?.filter(
  //     (node) => node.id === noteData.flowSelectedNode
  //   )[0];

  //   noteData.folders.filter((folder) => folder.id === folderId)[0].notes.filter((note) => note.id === noteId)[0].nodes?.filter(
  //     (node) => node.id === noteData.flowSelectedNode
  //   )[0].data.title

  useEffect(() => {
    const selectedNodeItem = note.nodes?.filter(
      (node) => node.id === noteData.flowSelectedNode
    )[0];
    setSelectedNode(selectedNodeItem);
  }, [noteData.folders, noteData.flowSelectedNode, note.nodes]);

  const onChangeData = (e: any) => {
    console.log(e.target.id);

    // let updatedNode = noteData.folders.map((folder) => {
    //   folder.notes.map((note) => {
    //     if (note.id === noteId) {
    //       note.nodes?.map((node) => {
    //         if (node.id === noteData.flowSelectedNode) {
    //           console.log(e.target.name);
    //           console.log(e.target.value);
    //           return { ...node.data, [e.target.name]: e.target.value };
    //         }
    //       });
    //     }
    //   });
    //   return folder;
    // });

    // noteData.setFolders([...updatedNode]);
  };

  return (
    <HeaderPanel expanded={props.expanded}>
      {selectedNode?.content_type === "markdown" ? (
        <MarkdownNotes
          header={selectedNode?.content_header}
          selectedNodeId={selectedNode?.id}
          content={selectedNode}
        ></MarkdownNotes>
      ) : (
        <Fragment></Fragment>
      )}
    </HeaderPanel>
  );
};

export default TextPanel;
