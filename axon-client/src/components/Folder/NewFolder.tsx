import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useContext, useState } from "react";
import FolderContext from "src/context/folder";
import { ICreateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useDataMutation } from "src/hooks/useDataMutation";
import { Alert } from "../Alert";

const NewFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ folderModal, setFolderModal }) => {
  const [newFolder, setNewFolder] = useState<ICreateFolder>({
    folder_name: "",
  });

  const { folderDispatch } = useContext(FolderContext);

  const {
    data,
    loading: newFolderLoading,
    error: newFolderError,
    mutate,
  } = useDataMutation<ICreateFolder>("folder");

  const handleNewFolder = () => {
    setFolderModal(false);
    mutate(newFolder);
    folderDispatch({
      type: "NEW_FOLDER",
      payload: {
        folder_id: data?.data,
        folder_name: newFolder.folder_name,
      },
    });
  };

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
          invalid={newFolderError && true}
          invalidText={"Invalid data provided"}
        />
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setFolderModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={handleNewFolder}
          disabled={newFolder.folder_name.length > 0 ? false : true}
        >
          {newFolderLoading ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
      {newFolderError && (
        <Alert
          title={"Error Creating new folder. Please try again later"}
          kind={"error"}
          hideCloseButton={false}
          lowContrast={true}
        />
      )}
    </ComposedModal>
  );
};

export default NewFolder;
