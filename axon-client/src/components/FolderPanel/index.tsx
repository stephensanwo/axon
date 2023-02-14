import { HeaderPanel } from "carbon-components-react";
import { useParams } from "react-router-dom";
import { NoteContext } from "../../context/notes";
import React, { Fragment, useContext, useEffect, useState } from "react";
import "./style.scss";
import MarkdownNotes from "../MarkdownNotes";
import { FolderProps } from "../../types/notes";

interface Props {
  expanded: boolean;
}

const FolderPanel: React.FC<Props> = (props) => {
  const { folderId } = useParams();
  const noteData = useContext(NoteContext);
  const [selectedFolder, setSelectedFolder] = useState<FolderProps>();
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  //   const selectedNode = note.nodes?.filter(
  //     (node) => node.id === noteData.flowSelectedNode
  //   )[0];

  //   noteData.folders.filter((folder) => folder.id === folderId)[0].notes.filter((note) => note.id === noteId)[0].nodes?.filter(
  //     (node) => node.id === noteData.flowSelectedNode
  //   )[0].data.title

  // useEffect(() => {
  //   const selectedFolderItem = note.nodes?.filter(
  //     (node) => node.id === noteData.flowSelectedNode
  //   )[0];
  //   setSelectedFolder(selectedFolderItem);
  // }, [noteData.folders, noteData.flowSelectedNode, note.nodes]);

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
      {/* {selectedNode?.content?.map((content_data) =>
        content_data.content_type === "markdown" ? (
          <MarkdownNotes
            header={selectedNode?.data.title}
            selectedNodeId={selectedNode.id}
            content={content_data}
          ></MarkdownNotes>
        ) : (
          <Fragment></Fragment>
        )
      )} */}
    </HeaderPanel>
  );
};

export default FolderPanel;
