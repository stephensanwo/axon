import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useState } from "react";
import { IMutateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useFolderMutation } from "src/hooks/folders/useFolderMutation";
import InlineAlert from "../InlineAlert";

const NewFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ folderModal, setFolderModal }) => {
  const [newFolder, setNewFolder] = useState<IMutateFolder>({
    folder_name: "",
    folder_id: "",
  });

  const { createFolder } = useFolderMutation(newFolder, setFolderModal);

  return (
    <ComposedModal
      size="sm"
      modalHeading="Modal heading"
      modalLabel="Label"
      open={folderModal}
      onClose={() => setFolderModal(false)}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader title="Create New Folder" />
      <ModalBody hasForm>
        <TextInput
          data-modal-primary-focus
          labelText="Name"
          value={newFolder.folder_name}
          placeholder="e.g. Project Axon"
          type="text"
          name="folder_name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewFolder({ ...newFolder, [e.target.name]: e.target.value })
          }
          invalid={createFolder.status === "error" && true}
          invalidText={"Invalid data provided"}
        />
        {createFolder.status === "error" && (
          <InlineAlert text="There was an error creating your folder. Please try again later." />
        )}
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setFolderModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={() => createFolder.mutate("folder")}
          disabled={newFolder.folder_name.length > 0 ? false : true}
        >
          {createFolder.status === "loading" ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NewFolder;
