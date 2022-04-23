import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { PageContainer, MobileContainerDiv } from "../../shared/layout";
import PageHeader from "../../components/PageHeader";
import FolderContent from "./FolderContent";
import SideNavPanel from "../../components/SideNavPanel/MenuPanel";

const FolderContainer = styled.div`
  margin-left: 320px;
`;

const SignedIn: React.FC = () => {
  const [modal, setModal] = useState("");

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      // e.preventDefault();
    });
  });

  const toggleModal = () => {
    if (modal === "") {
      setModal("is-visible");
    } else {
      setModal("");
    }
  };

  return (
    <Fragment>
      <MobileContainerDiv dark>
        <PageHeader
          breadcrumb={[
            { text: "Home", isCurrentPage: false, link: "/" },
            { text: "Folders", isCurrentPage: true },
          ]}
          headerText={"Folders"}
        />
      </MobileContainerDiv>

      <FolderContainer>
        <PageContainer dark>
          <SideNavPanel />
          <PageHeader
            breadcrumb={[
              { text: "Home", isCurrentPage: false, link: "/" },
              { text: "Folders", isCurrentPage: true },
            ]}
            headerText={"Folders"}
          />

          <FolderContent />
        </PageContainer>
      </FolderContainer>
    </Fragment>
  );
};
export default SignedIn;
