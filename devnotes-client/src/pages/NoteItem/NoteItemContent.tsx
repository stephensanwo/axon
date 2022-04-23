import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Add32 } from "@carbon/icons-react";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { NoteContext } from "../../context/notes";
import FlowTree from "../../components/FlowTree";
import CodeSnippet from "../../components/CodeSnippet";
import MarkdownNotes from "../../components/MarkdownNotes";

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  height: 100%;
`;

export const NoteItemDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const NoteItemContent = () => {
  const { folderId, noteId, userId } = useParams();
  const noteData = useContext(NoteContext);

  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];

  const note = folder.notes.filter((note) => note.id === noteId)[0];
  console.log(note);

  return (
    <Fragment>
      <PageHeader
        breadcrumb={[
          { text: "Home", isCurrentPage: false, link: "/" },
          {
            text: "Folders",
            isCurrentPage: false,
            link: `/folders/${userId}`,
          },
          {
            text: `${folder.name}`,
            isCurrentPage: false,
            link: `/folders/${userId}/${folderId}`,
          },
          { text: `${note.name}`, isCurrentPage: true },
        ]}
        headerText={note.name}
      />
      <FlowItemContainer>
        {note.category === "flow" ? (
          <NoteItemDiv>
            <FlowTree />
          </NoteItemDiv>
        ) : note.category === "code-snippet" ? (
          <NoteItemDiv>
            <CodeSnippet />
          </NoteItemDiv>
        ) : (
          <NoteItemDiv>
            <MarkdownNotes />
          </NoteItemDiv>
        )}
      </FlowItemContainer>
    </Fragment>
  );
};

export default NoteItemContent;
