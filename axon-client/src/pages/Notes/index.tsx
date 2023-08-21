import { useEffect, Fragment, useContext } from "react";
import PageHeader from "src/components/PageHeader";
import { PageContainer } from "src/shared/layout";
import NoteContext from "src/context/notes";
import FolderContext from "src/context/folder";
import { INote } from "src/types/notes";
import styled from "styled-components";
import AppContext from "src/context/app";
import FlowTree from "src/components/FlowTree";
import Folders from "../Folders";
import { fetchData } from "src/api/query";
import { Alert } from "src/components/Alert";
import useSWR from "swr";

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
  const { selectedNote } = useContext(FolderContext);
  const { noteDispatch } = useContext(NoteContext);

  //  Fetch the data directly without using the useDataFetching Hook
  // Set selectedNote as dependency
  const {
    data: noteData,
    error: noteError,
    isLoading: noteLoading,
  } = useSWR<INote>(
    `note-detail-${selectedNote?.note_id}`,
    () =>
      fetchData(
        `note-detail?folder_id=${selectedNote?.folder_id}&note_id=${selectedNote?.note_id}`
      ),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return; // Retry up to 3 times
        setTimeout(() => revalidate({ retryCount }), 5000); // Retry after 5 seconds
      },
    }
  );

  useEffect(() => {
    noteDispatch({
      type: "INIT_NOTE",
      payload: noteData ?? ({} as INote),
    });
  }, [noteData]);

  return (
    <Fragment>
      <PageContainer dark>
        <Folders />
        <FlowItemContainer>
          <NoteDiv>{noteData && <FlowTree />}</NoteDiv>
          {noteError && (
            <Alert
              title={"Error fetching note detail. Please try again later"}
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
