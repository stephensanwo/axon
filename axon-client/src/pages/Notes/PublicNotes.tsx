import { Fragment, useContext } from "react";
import { PageContainer } from "src/shared/layout";
import styled from "styled-components";
import { Alert } from "src/components/Alert";
import { NoteRenderState } from "./NoteRenderState";
import PublicNoteContext from "src/context/public";
import PublicFlowTree from "src/components/FlowTree/PublicFlowTree";
import PublicNoteMenu from "../NoteMenu/PublicNoteMenu";

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

const PublicNotes: React.FC = () => {
  const { noteQuery, note, viewSwitcher } = useContext(PublicNoteContext);

  return (
    <Fragment>
      <PageContainer dark>
        <FlowItemContainer>
          {noteQuery.status === "success" &&
            (note?.nodes?.length > 0 ? (
              <>
                {viewSwitcher === "flow" && (
                  <NoteDiv>{note && <PublicFlowTree />}</NoteDiv>
                )}
              </>
            ) : (
              <NoteRenderState state="public-empty" />
            ))}
          {noteQuery.status === "loading" && (
            <>
              <NoteRenderState state="loading" />
            </>
          )}
          {noteQuery.status === "error" && (
            <>
              <NoteRenderState state="public-error" />
              <Alert
                title={"Error Loading Note"}
                subtitle="The note does not exist or you do not have permission to view it."
                kind={"error"}
                hideCloseButton={false}
                lowContrast={true}
              />
            </>
          )}
        </FlowItemContainer>
        {noteQuery.status === "success" && <PublicNoteMenu />}
      </PageContainer>
    </Fragment>
  );
};

export default PublicNotes;
