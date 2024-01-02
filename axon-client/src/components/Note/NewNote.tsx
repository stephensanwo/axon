import React from "react";
import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useContext, useState } from "react";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { IMutateNote } from "src/types/notes";
import { IFolderList } from "src/types/folders";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";
import InlineAlert from "../InlineAlert";
import FolderContext from "src/context/folder";

const NewNote: React.FC<{
  folder: IFolderList;
}> = ({ folder }) => {
  const { folderMenu, setFolderMenu } = useContext(FolderContext);
  const [newNote, setNewNote] = useState<IMutateNote>({
    folder_id: folder.folder_id,
    description: "",
    note_name: "",
    note_id: "",
  });
  const { createNote } = useNoteMutation(newNote);

  return (
    <ComposedModal
      size="sm"
      open={folderMenu.newNote}
      onClose={() => setFolderMenu({ ...folderMenu, newNote: false })}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader
        title="Create New Note"
        label={`${folder.folder_name} / ${newNote?.note_name}`}
      />
      <ModalBody hasForm>
        <TextInput
          data-modal-primary-focus
          id="note-name"
          labelText="Name"
          value={newNote.note_name}
          placeholder="e.g. Project Axon Frontend Workflow"
          type="text"
          name="note_name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewNote((prevNote) => ({
              ...prevNote,
              [e.target.name]: e.target.value,
            }))
          }
          invalid={createNote.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
        <TextInput
          data-modal-primary-focus
          id="note-description"
          labelText="Description"
          value={newNote.description}
          placeholder="e.g. Project Axon Frontend Workflow"
          type="text"
          name="description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewNote((prevNote) => ({
              ...prevNote,
              [e.target.name]: e.target.value,
            }))
          }
          invalid={createNote.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
        {createNote.status === "error" && (
          <InlineAlert text="There was an error creating your note. Please try again later." />
        )}
      </ModalBody>
      <ModalFooter>
        <AxonButton
          kind="secondary"
          onClick={() => setFolderMenu({ ...folderMenu, newNote: false })}
        >
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={() => createNote.mutate("note")}
          disabled={
            newNote.note_name.length && newNote.description.length > 0
              ? false
              : createNote.status === "loading"
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

export default React.memo(NewNote);
