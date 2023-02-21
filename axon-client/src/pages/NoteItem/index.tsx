import { useState, useEffect, Fragment, useContext } from "react";
import PageHeader from "components/PageHeader";
import SideNavPanel from "components/SideNavPanel";
import { PageContainer, MobileWarningDiv } from "shared/layout";
import NoteItemContent from "./NoteItemContent";
import { HeaderMenu } from "./Menu";

const NoteItem: React.FC = () => {
  return (
    <Fragment>
      <PageHeader
        headerText={"nodeItemData.name"}
        theme={"dark"}
        documentTitle="New Document"
        headerMenu={HeaderMenu}
      />
      <PageContainer dark>
        <SideNavPanel />
        {/* <NoteItemContent /> */}
      </PageContainer>
    </Fragment>
  );
};

export default NoteItem;
