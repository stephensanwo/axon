import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useState } from "react";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { ISelectedNote, IMutateNote } from "src/types/notes";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";

const EditNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  note: ISelectedNote;
}> = ({ note, noteModal, setNoteModal }) => {
  const [updateNote, setUpdateNote] = useState<IMutateNote>({
    folder_id: note?.folder_id,
    note_id: note?.note_id,
    description: note?.description,
    note_name: note?.note_name,
  });

  const { editNote, deleteNote } = useNoteMutation(updateNote, setNoteModal);

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
          invalid={editNote.status === "error" && true}
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
          invalid={editNote.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
      </ModalBody>
      <ModalFooter>
        <AxonButton
          kind="secondary"
          onClick={() =>
            deleteNote.mutate(
              `note?folder_id=${note.folder_id}&note_id=${note.note_id}`
            )
          }
        >
          {deleteNote.status === "loading" ? <AxonInlineLoader /> : "Delete"}
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={() =>
            editNote.mutate(
              `note?folder_id=${note.folder_id}&note_id=${note.note_id}`
            )
          }
        >
          {editNote.status === "loading" ? (
            <AxonInlineLoader />
          ) : (
            "Confirm Changes"
          )}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EditNote;
