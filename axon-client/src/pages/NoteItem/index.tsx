import { useEffect, Fragment, useContext } from "react";
import PageHeader from "components/PageHeader";
import SideNavPanel from "components/SideNavPanel";
import { PageContainer, MobileWarningDiv } from "shared/layout";
import NoteItemContent from "./NoteItemContent";
import { HeaderMenu } from "./Menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_NOTE_DETAIL } from "api/queries/note";
import NoteContext from "context/notes";
import FolderContext from "context/folder";
import AxonLoader from "components/Loader/Loader";
import { NoteProps } from "types/notes";

const NoteItem: React.FC = () => {
  const { folders, folderDispatch, selectedNote, setSelectedNote } =
    useContext(FolderContext);

  const { note, noteDispatch } = useContext(NoteContext);

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
  }, [selectedNote]);

  console.log(note);
  return (
    <Fragment>
      {!queryNote.isLoading ? (
        <Fragment>
          <PageHeader
            headerText={"note"}
            theme={"dark"}
            documentTitle={note?.name || ""}
            headerMenu={HeaderMenu}
          />
          <PageContainer dark>
            <SideNavPanel />
            <NoteItemContent />
          </PageContainer>
        </Fragment>
      ) : (
        <AxonLoader></AxonLoader>
      )}
    </Fragment>
  );
};

export default NoteItem;
