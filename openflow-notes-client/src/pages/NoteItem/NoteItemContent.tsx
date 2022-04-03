import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Play32 } from "@carbon/icons-react";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { NoteContext } from "../../context/notes";

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 85vh;
  padding-bottom: 20px;
`;

export const FlowTreeDiv = styled.div`
  background-color: #262626;
  width: 80%;
`;
const NodeSelectorDiv = styled.div`
  width: 17.5%;
`;

const NoteItemContent = () => {
  const { pathname } = useLocation();
  const { folderId, noteId } = useParams();
  const noteData = useContext(NoteContext);

  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];

  const note = folder.notes.filter((note) => note.id === noteId)[0];
  console.log(note);

  return (
    <Fragment>
      <PageHeader
        breadcrumb={[
          { text: "Home", isCurrentPage: false, link: "/" },
          { text: "Folders", isCurrentPage: false, link: "/flow" },
          { text: `${note.name}`, isCurrentPage: true },
        ]}
        buttonText={"Run All"}
        icon={Play32}
        headerText={note.name}
      />
      <FlowItemContainer>
        <NodeSelectorDiv></NodeSelectorDiv>
        <FlowTreeDiv></FlowTreeDiv>
      </FlowItemContainer>
    </Fragment>
  );
};

export default NoteItemContent;
