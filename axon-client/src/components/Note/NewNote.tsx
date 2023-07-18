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
import { CreateNoteProps } from "src/types/notes";
import { CREATE_NEW_NOTE } from "src/api/queries/note";
import { IFolderList } from "src/types/folders";

const NewNote: React.FC<{
  noteModal: boolean;
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: IFolderList;
}> = ({ folder, noteModal, setNoteModal }) => {
  const [newNote, setNewNote] = useState<CreateNoteProps>({
    folder_id: folder.folder_id,
    note_description: "",
    note_name: "",
  });
  const [formErros, setFormErrors] = useState<CreateNoteProps>({
    folder_id: "",
    note_description: "",
    note_name: "",
  });

  const { folderDispatch } = useContext(FolderContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => CREATE_NEW_NOTE(newNote),
    onSuccess: (res: any) => {
      console.log(res);
      folderDispatch({
        type: "new_note",
        payload: newNote,
      });
      setNoteModal(false);
    },
    onError: (err: any) => {
      console.log(err);
      setFormErrors(err.response.data?.fields);
    },
  });

  const handleNewFolder = () => {
    mutate();
  };

  console.log(newNote);
  return (
    <ComposedModal
      size="sm"
      modalHeading="Modal heading"
      modalLabel="Label"
      open={noteModal}
      onClose={() => setNoteModal(false)}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader title="Add Note to Folder Group" label={folder.name} />
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
          invalid={formErros.note_name && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
        <TextInput
          data-modal-primary-focus
          labelText="Description"
          value={newNote.note_description}
          placeholder="e.g. Project Axon Frontend Workflow"
          type="text"
          name="note_description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewNote({ ...newNote, [e.target.name]: e.target.value })
          }
          invalid={formErros.note_description && true}
          invalidText={"Invalid data provided"}
        />
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setNoteModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={handleNewFolder}
          disabled={newNote.note_name.length > 0 ? false : true}
        >
          {isLoading ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NewNote;
