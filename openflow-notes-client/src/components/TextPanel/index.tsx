import { HeaderPanel, Switcher, SwitcherItem } from "carbon-components-react";
import { Link } from "react-router-dom";
import { TreeView16, Flow16, EdgeNodeAlt16 } from "@carbon/icons-react";
import { useParams } from "react-router-dom";
import { NodeProps, NoteContext } from "../../context/notes";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";

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
  }, [noteData.folders, noteData.flowSelectedNode]);

  const onChangeData = (e: any) => {
    console.log(e.target.id);

    let updatedNode = noteData.folders.map((folder) => {
      folder.notes.map((note) => {
        if (note.id === noteId) {
          note.nodes?.map((node) => {
            if (node.id === noteData.flowSelectedNode) {
              console.log(e.target.name);
              console.log(e.target.value);
              return { ...node.data, [e.target.name]: e.target.value };
            }
          });
        }
      });
      return folder;
    });

    noteData.setFolders([...updatedNode]);
  };

  console.log(noteData.folders[0].notes[0].nodes[0].data.title);
  return (
    <HeaderPanel expanded={props.expanded}>
      <div className="textpanel-container">
        <div className={"title-input"}>
          <textarea
            id={selectedNode?.id}
            placeholder={""}
            name={"title"}
            value={selectedNode?.data.title}
            onChange={onChangeData}
          />
        </div>
      </div>
      <p>{JSON.stringify(selectedNode)}</p>
    </HeaderPanel>
  );
};

export default TextPanel;
