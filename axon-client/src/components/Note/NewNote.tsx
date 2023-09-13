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
import { IMutateNote } from "src/types/notes";
import { IFolderList } from "src/types/folders";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";
import InlineAlert from "../InlineAlert";

const NewNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: IFolderList;
}> = ({ folder, noteModal, setNoteModal }) => {
  const [newNote, setNewNote] = useState<IMutateNote>({
    folder_id: folder.folder_id,
    description: "",
    note_name: "",
    note_id: "",
  });

  const { createNote } = useNoteMutation(newNote, setNoteModal);

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
        title="Create New Note"
        label={`${folder.folder_name} / ${newNote?.note_name}`}
      />
      <ModalBody hasForm>
        <TextInput
          data-modal-primary-focus
          labelText="Name"
          value={newNote.note_name}
          placeholder="e.g. Project Axon Frontend Workflow"
          type="text"
          name="note_name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewNote({ ...newNote, [e.target.name]: e.target.value })
          }
          invalid={createNote.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
        <TextInput
          data-modal-primary-focus
          labelText="Description"
          value={newNote.description}
          placeholder="e.g. Project Axon Frontend Workflow"
          type="text"
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewNote({ ...newNote, [e.target.name]: e.target.value })
          }
          invalid={createNote.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
        {createNote.status === "error" && (
          <InlineAlert text="There was an error creating your note. Please try again later." />
        )}
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setNoteModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={() => createNote.mutate("note")}
          disabled={
            newNote.note_name.length && newNote.description.length > 0
              ? false
              : true
          }
        >
          {createNote.status === "loading" ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NewNote;
