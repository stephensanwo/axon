import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
  Button,
} from "@carbon/react";
import { useContext, useState } from "react";
import FolderContext from "src/context/folder";
import { ICreateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useDataDeletion, useDataUpdate } from "src/hooks/useDataMutation";
import { ISelectedNote, IUpdateNoteProps } from "src/types/notes";

const EditNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  note: ISelectedNote;
}> = ({ note, noteModal, setNoteModal }) => {
  const [updateNote, setUpdateNote] = useState<IUpdateNoteProps>({
    folder_id: note?.folder_id,
    note_id: note?.note_id,
    description: note?.description,
    note_name: note?.note_name,
  });

  const { folders, folderDispatch } = useContext(FolderContext);

  const {
    loading: editNoteLoading,
    error: editNoteError,
    update,
  } = useDataUpdate<Omit<IUpdateNoteProps, "folder_id" | "note_id">>(
    `note?folder_id=${note.folder_id}&note_id=${note.note_id}`
  );

  const {
    loading: deleteNoteLoading,
    error: deleteNoteError,
    delete: deletefn,
  } = useDataDeletion<IUpdateNoteProps>(
    `note?folder_id=${note.folder_id}&note_id=${note.note_id}`
  );

  const editNote = () => {
    setNoteModal(false);
    update(updateNote);
    folderDispatch({
      type: "EDIT_NOTE",
      payload: {
        folder_id: note.folder_id,
        note_id: note.note_id,
        note_name: updateNote.note_name,
        description: updateNote.description,
      },
    });
  };

  const deleteNote = () => {
    if (window.confirm(`Are you sure you want to delete this folder?`)) {
      setNoteModal(false);
      deletefn();
      folderDispatch({
        type: "DELETE_NOTE",
        payload: {
          note_id: note.note_id,
          folder_id: note.folder_id,
        },
      });
    }
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
      <ModalHeader title="Edit Note" />
      <ModalBody hasForm>
        <TextInput
          data-modal-primary-focus
          labelText="Name"
          value={updateNote.note_name}
          placeholder="e.g. Project Axon Backend"
          type="text"
          name="note_name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdateNote({
              ...updateNote,
              [e.target.name]: e.target.value,
            })
          }
          invalid={editNoteError && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
        <TextInput
          data-modal-primary-focus
          labelText="Description"
          value={updateNote.description}
          placeholder="e.g. Project Axon Backend"
          type="text"
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdateNote({
              ...updateNote,
              [e.target.name]: e.target.value,
            })
          }
          invalid={editNoteError && true}
          invalidText={"Invalid data provided"}
        />
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={deleteNote}>
          {deleteNoteLoading ? <AxonInlineLoader /> : "Delete"}
        </AxonButton>
        <AxonButton kind="primary" onClick={() => editNote()}>
          {editNoteLoading ? <AxonInlineLoader /> : "Confirm Changes"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EditNote;
