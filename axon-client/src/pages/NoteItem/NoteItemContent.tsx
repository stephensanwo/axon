import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { NoteContext } from "../../context/notes";
import FlowTree from "../../components/FlowTree";
import AppContext from "../../context/app";
import { NoteProps } from "../../types/notes";

const FlowItemAdjustable = styled.div`
  margin-left: ${(props: { isSideNavExpanded: boolean }) =>
    props.isSideNavExpanded ? "320px" : "0px"};
`;

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const NoteItemDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Divider = styled.div`
  background-color: #393939;
  height: 1px;
  width: 100vw;
  position: absolute;
  top: 95px;
  left: 0%;
  transform: translate(-0%, -50%);
`;

const NoteItemContent = () => {
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);
  const { isSideNavExpanded } = useContext(AppContext);
  const [note, setNote] = useState<NoteProps>(noteData.folders[0].notes[0]);

  useEffect(() => {
    const folder = noteData.folders.filter(
      (folder) => folder.id === folderId
    )[0];

    console.log(folder);
    const note = folder.notes.filter((note) => note.id === noteId)[0];
    console.log(note);

    setNote(folder.notes.filter((note) => note.id === noteId)[0]);
  }, [noteId]);

  return (
    <FlowItemAdjustable isSideNavExpanded={isSideNavExpanded}>
      <PageHeader />
      {/* <Divider /> */}
      <FlowItemContainer>
        <NoteItemDiv>
          <FlowTree />
        </NoteItemDiv>
      </FlowItemContainer>
    </FlowItemAdjustable>
  );
};

export default NoteItemContent;
