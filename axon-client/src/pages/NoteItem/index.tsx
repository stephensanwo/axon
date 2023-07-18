import { useEffect, Fragment, useContext } from "react";
import PageHeader from "src/components/PageHeader";
import SideNavPanel from "src/components/SideNavPanel";
import { PageContainer } from "src/shared/layout";
import { useMutation } from "@tanstack/react-query";
import { GET_NOTE_DETAIL } from "src/api/queries/note";
import NoteContext from "src/context/notes";
import FolderContext from "src/context/folder";
import AxonLoader from "src/components/Loader/Loader";
import { NoteProps } from "src/types/notes";
import styled from "styled-components";
import AppContext from "src/context/app";
import FlowTree from "src/components/FlowTree";

const FlowItemAdjustable = styled.div`
  margin-left: ${(props: { isSideNavExpanded: boolean }) =>
    props.isSideNavExpanded ? "320px" : "0px"};
`;

const FlowItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const NoteItemDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const NoteItem: React.FC = () => {
  const { selectedNote } = useContext(FolderContext);
  const { note, noteDispatch } = useContext(NoteContext);
  const { isSideNavExpanded } = useContext(AppContext);

  const queryNote = useMutation({
    mutationFn: () => GET_NOTE_DETAIL(selectedNote),
    onSuccess: (data: NoteProps) => {
      console.log(data);
      noteDispatch({
        type: "init_note",
        payload: data,
      });
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  useEffect(() => {
    queryNote.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote]);

  console.log(note);
  return (
    <Fragment>
      {!queryNote.isLoading ? (
        <Fragment>
          <PageHeader theme={"dark"} documentTitle={note?.name || ""} />
          <PageContainer dark>
            <SideNavPanel />
            <FlowItemAdjustable isSideNavExpanded={isSideNavExpanded}>
              <FlowItemContainer>
                <NoteItemDiv>
                  <FlowTree />
                </NoteItemDiv>
              </FlowItemContainer>
            </FlowItemAdjustable>
          </PageContainer>
        </Fragment>
      ) : (
        <AxonLoader></AxonLoader>
      )}
    </Fragment>
  );
};

export default NoteItem;
