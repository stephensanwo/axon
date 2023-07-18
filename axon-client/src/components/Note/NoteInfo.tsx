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
import {
  CreateNoteProps,
  NoteProps,
  ISelectedNote,
  INoteModal,
} from "src/types/notes";
import { CREATE_NEW_NOTE, DELETE_NOTE } from "src/api/queries/note";
import moment from "moment";

const NoteInfo: React.FC<{
  noteModal: INoteModal;
  setNoteModal: React.Dispatch<React.SetStateAction<INoteModal>>;
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
      setNoteModal({
        ...noteModal,
        info: false,
      });
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
      open={noteModal}
      onClose={() =>
        setNoteModal({
          ...noteModal,
          info: false,
        })
      }
      preventCloseOnClickOutside={true}
    >
      <ModalHeader
        title={note?.name}
        label={"Note Details"}
        style={{ marginBottom: "20px" }}
      />
      <ModalBody>
        <div style={{ marginBottom: "20px" }}>
          <h6>Description</h6>
          <p>{note.description}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h6>Created On</h6>
          <p>{moment(note.date_created, "YYYYMMDD").fromNow()}</p>
        </div>
        <div>
          <h6>Last Updated</h6>
          <p>{moment(note.last_edited, "YYYYMMDD").fromNow()}</p>
        </div>
      </ModalBody>
    </ComposedModal>
  );
};

export default NoteInfo;
