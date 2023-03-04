import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
  Button,
} from "@carbon/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import FolderContext from "context/folder";
import { AxonButton } from "components/Button";
import AxonInlineLoader from "components/Loader/InlineLoader";
import { CreateNoteProps, NoteProps, SelectedNoteProps } from "types/notes";
import { CREATE_NEW_NOTE, DELETE_NOTE } from "api/queries/note";
import { FolderListProps } from "types/folders";

const DeleteNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  note: NoteProps;
}> = ({ note, noteModal, setNoteModal }) => {
  const { folderDispatch } = useContext(FolderContext);
  const selectedNoteData: SelectedNoteProps = {
    folder_id: note.folder_id,
    note_id: note.note_id,
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => DELETE_NOTE(selectedNoteData),
    onSuccess: (res: any) => {
      console.log(res);
      folderDispatch({
        type: "delete_note",
        payload: selectedNoteData,
      });
      setNoteModal(false);
    },
    onError: (err: any) => {
      console.log(err);
      // Log error to toast notification
    },
  });

  const handleNewFolder = () => {
    mutate();
  };

  return (
    <ComposedModal
      size="sm"
      modalHeading="Modal heading"
      modalLabel="Label"
      open={noteModal}
      onClose={() => setNoteModal(false)}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader title="Delete Note" label={note?.name} />
      <ModalBody hasForm>
        <h4>Are you sure you want to delete this note?</h4>
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setNoteModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton kind="danger" onClick={handleNewFolder} disabled={false}>
          {isLoading ? <AxonInlineLoader /> : "Delete"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default DeleteNote;
