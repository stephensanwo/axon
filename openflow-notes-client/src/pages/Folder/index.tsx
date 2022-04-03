import React, { useState } from "react";
import styled from "styled-components";
import { PageContainer, MobileContainerDiv } from "../../shared/layout";
import PageHeader from "../../components/PageHeader";
import { NoteContextProvider } from "../../context/notes";
import FolderContent from "./FolderContent";

const FlowContainer = styled.div``;

const SignedIn: React.FC = () => {
  const [modal, setModal] = useState("");

  const toggleModal = () => {
    if (modal === "") {
      setModal("is-visible");
    } else {
      setModal("");
    }
  };

  return (
    <NoteContextProvider>
      <MobileContainerDiv dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            { text: "Notes", isCurrentPage: true },
          ]}
          headerText={"Notes"}
        />
      </MobileContainerDiv>

      <PageContainer dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            { text: "Notes", isCurrentPage: true },
          ]}
          headerText={"Notes"}
        />

        <FlowContainer>
          <FolderContent />
        </FlowContainer>
      </PageContainer>
    </NoteContextProvider>
  );
};
export default SignedIn;
