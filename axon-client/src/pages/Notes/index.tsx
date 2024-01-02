import { Fragment, useContext } from "react";
import { PageContainer } from "src/shared/layout";
import FolderContext from "src/context/folder";
import styled from "styled-components";
import FlowTree from "src/components/FlowTree";
import Folders from "../Folders";
import { Alert } from "src/components/Alert";
import NoteMenu from "../NoteMenu";
import NodePanel from "src/components/Note/NodePanel";
import { NoteRenderState } from "./NoteRenderState";
import NoteContext from "src/context/notes";
import EdgeMenu from "src/components/Edge/EdgeMenu";
import EdgeContext from "src/context/edge";

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
`;

export const NoteDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Notes: React.FC = () => {
  const { folderQuery, selectedNote } = useContext(FolderContext);
  const { noteQuery, note } = useContext(NoteContext);
  const { edgeMenu } = useContext(EdgeContext);
  return (
    <Fragment>
      <PageContainer dark>
        <Folders />
        {noteQuery?.status === "success" && selectedNote?.note_id && (
          <NodePanel />
        )}
        <FlowItemContainer>
          {noteQuery?.status === "success" &&
            (selectedNote?.note_id ? (
              <NoteDiv>{note && <FlowTree />}</NoteDiv>
            ) : (
              <NoteRenderState state="empty" />
            ))}
          {noteQuery?.status === "loading" && (
            <>
              <NoteRenderState state="loading" />
            </>
          )}
          {noteQuery?.status === "error" && (
            <>
              <NoteRenderState state="error" />
              <Alert
                title={"Error Loading Notes"}
                subtitle="There was an error loading your notes. Please try again later."
                kind={"error"}
                hideCloseButton={false}
                lowContrast={true}
              />
            </>
          )}
          {folderQuery?.status === "error" && (
            <Alert
              title={"Error Loading Folders"}
              subtitle="There was an error loading your folders. Please try again later."
              kind={"error"}
              hideCloseButton={false}
              lowContrast={true}
            />
          )}
        </FlowItemContainer>
        {noteQuery?.status === "success" && <NoteMenu />}
        {edgeMenu === "edge-options" && <EdgeMenu />}
      </PageContainer>
    </Fragment>
  );
};

export default Notes;
