import React from "react";
import { PageContainer, MobileContainerDiv } from "../../shared/layout";
import PageHeader from "../../components/PageHeader";
import NoteList from "./NoteList";
import { NoteContextProvider } from "../../context/notes";
import { useParams } from "react-router-dom";

const Notes = () => {
  const { userId } = useParams();
  return (
    <NoteContextProvider>
      <MobileContainerDiv dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            {
              text: "Folder",
              isCurrentPage: false,
              link: `/folders/${userId}`,
            },
            { text: "Notes", isCurrentPage: true },
          ]}
          headerText={"Notes"}
        />
      </MobileContainerDiv>

      <PageContainer dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            {
              text: "Folders",
              isCurrentPage: false,
              link: `/folders/${userId}`,
            },
            { text: "Notes", isCurrentPage: true },
          ]}
          headerText={"Notes"}
        />

        <NoteList />
      </PageContainer>
    </NoteContextProvider>
  );
};

export default Notes;
