import React, { Fragment, useContext } from "react";
import { PageContainer, MobileContainerDiv } from "../../shared/layout";
import PageHeader from "../../components/PageHeader";
import NoteList from "./NoteList";
import styled from "styled-components";
import { NoteContext } from "../../context/notes";
import { useParams } from "react-router-dom";
import SideNavPanel from "../../components/SideNavPanel/MenuPanel";

const FolderContainer = styled.div`
  margin-left: 320px;
`;

const Notes = () => {
  const noteData = useContext(NoteContext);
  const { userId, folderId } = useParams();
  const folder = noteData.folders.filter((folder) => folder.id === folderId)[0];

  return (
    <Fragment>
      <MobileContainerDiv dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            {
              text: "Folders",
              isCurrentPage: false,
              link: `/folders/${userId}`,
            },
            { text: `${folder?.name}`, isCurrentPage: true },
          ]}
          headerText={`${folder?.name.slice(0, 50)}${
            folder?.name.length > 50 ? "..." : ""
          }`}
        />
      </MobileContainerDiv>
      <FolderContainer>
        <PageContainer dark>
          <SideNavPanel />
          <PageHeader
            breadcrumb={[
              { text: "Home", isCurrentPage: false, link: "/" },
              {
                text: "Folders",
                isCurrentPage: false,
                link: `/folders/${userId}`,
              },
              {
                text: `${folder?.name.slice(0, 50)}${
                  folder?.name.length > 50 ? "..." : ""
                }`,
                isCurrentPage: true,
              },
            ]}
            headerText={`${folder?.name.slice(0, 50)}${
              folder?.name.length > 50 ? "..." : ""
            }`}
          />

          <NoteList />
        </PageContainer>
      </FolderContainer>
    </Fragment>
  );
};

export default Notes;
