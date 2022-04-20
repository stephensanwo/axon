import { HeaderPanel } from "carbon-components-react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { NoteContext } from "../../context/notes";
import React, { useContext, useEffect, useState } from "react";
import "../TextPanel/style.scss";
import "./style.scss";
import { Tag } from "carbon-components-react";
import { Heading5 } from "../../shared/layout";

interface Props {
  expanded: boolean;
}
const PanelDiv = styled.div`
  margin-top: 40px;
  padding: 20px;
`;

const CodeDescriptionPanel: React.FC<Props> = (props) => {
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];
  const note = folder.notes.filter((note) => note.id === noteId)[0];

  const onChangeData = (e: any) => {
    console.log(e.target.value);
    // let updatedNote = noteData.folders.map((folder) => {
    //   folder.notes.map((note) => {
    //     if (note.id === noteId) {
    //       return updatedCode;
    //     }
    //   });
    //   return folder;
    // });

    // noteData.setFolders([...updatedNote]);
  };

  return (
    <HeaderPanel expanded={props.expanded}>
      <PanelDiv>
        <div className={"title-input "}>
          <textarea
            id={note?.id}
            placeholder={""}
            name={"description"}
            value={note.name}
            onChange={onChangeData}
          />
        </div>{" "}
        <div className={"title-input regular-input"}>
          <textarea
            id={note?.id}
            placeholder={""}
            name={"description"}
            value={note.description}
            onChange={onChangeData}
          />
        </div>
      </PanelDiv>
    </HeaderPanel>
  );
};

export default CodeDescriptionPanel;
