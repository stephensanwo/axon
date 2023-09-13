import { Fragment, useContext } from "react";
import { PageContainer } from "src/shared/layout";
import FolderContext from "src/context/folder";
import styled from "styled-components";
import FlowTree from "src/components/FlowTree";
import Folders from "../Folders";
import { Alert } from "src/components/Alert";
import { useInitNotes } from "src/hooks/notes/useInitNotes";

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 88px);
  width: 100vw;
`;

export const NoteDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Notes: React.FC = () => {
  const { folderQuery } = useContext(FolderContext);
  const { noteData, noteQuery } = useInitNotes();

  return (
    <Fragment>
      <PageContainer dark>
        <Folders />
        <FlowItemContainer>
          <NoteDiv>{noteData && <FlowTree />}</NoteDiv>
          {noteQuery.status == "error" && (
            <Alert
              title={"Error Loading Notes"}
              subtitle="There was an error loading your notes. Please try again later."
              kind={"error"}
              hideCloseButton={false}
              lowContrast={true}
            />
          )}
          {folderQuery.status === "error" && (
            <Alert
              title={"Error Loading Folders"}
              subtitle="There was an error loading your folders. Please try again later."
              kind={"error"}
              hideCloseButton={false}
              lowContrast={true}
            />
          )}
        </FlowItemContainer>
      </PageContainer>
    </Fragment>
  );
};

export default Notes;
