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
import FolderContext from "src/context/folder";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { CreateNoteProps, NoteProps, ISelectedNote } from "src/types/notes";
import { CREATE_NEW_NOTE, DELETE_NOTE } from "src/api/queries/note";

const DeleteNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  note: NoteProps;
}> = ({ note, noteModal, setNoteModal }) => {
  const { folderDispatch } = useContext(FolderContext);
  const selectedNoteData = {} as ISelectedNote;
  selectedNoteData.folder_id = note.folder_id;
  selectedNoteData.note_id = note.note_id;

  console.log(selectedNoteData);

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
      <ModalHeader
        title="Are you sure you want to delete this note?"
        label={note?.name}
        style={{ marginBottom: "20px" }}
      />
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
