import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useContext, useState } from "react";
import FolderContext from "src/context/folder";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { ICreateNoteProps, INote } from "src/types/notes";
import { IFolderList } from "src/types/folders";
import { useDataMutation } from "src/hooks/useDataMutation";
import AuthContext from "src/context/auth";

const NewNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: IFolderList;
}> = ({ folder, noteModal, setNoteModal }) => {
  const [newNote, setNewNote] = useState<ICreateNoteProps>({
    folder_id: folder.folder_id,
    description: "",
    note_name: "",
  });

  const { folderDispatch, setSelectedNote } = useContext(FolderContext);
  const { user } = useContext(AuthContext);
  const {
    loading: newNoteLoading,
    error: newNoteError,
    mutate,
    data: newNoteData,
  } = useDataMutation<ICreateNoteProps>("note");

  const handleNewNote = () => {
    setNoteModal(false);
    mutate(newNote);
    folderDispatch({
      type: "NEW_NOTE",
      payload: {
        user_id: user?.user_id || "",
        folder_id: folder.folder_id,
        note_id: "",
        note_name: newNote?.note_name || "",
        description: newNote?.description || "",
        date_created: "",
        last_edited: "",
      },
    });
    setSelectedNote({
      user_id: user?.user_id || "",
      folder_id: folder.folder_id,
      note_id: newNoteData,
      note_name: newNote?.note_name || "",
      description: newNote?.description || "",
      date_created: "",
      last_edited: "",
      folder_name: folder.folder_name,
    });
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
          invalid={newNoteError && true}
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
          invalid={newNoteError && true}
          invalidText={"Invalid data provided"}
        />
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setNoteModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={handleNewNote}
          disabled={
            newNote.note_name.length && newNote.description.length > 0
              ? false
              : true
          }
        >
          {newNoteLoading ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NewNote;
