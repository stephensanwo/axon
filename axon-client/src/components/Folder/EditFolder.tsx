import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useState } from "react";
import { IFolderList, IMutateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useFolderMutation } from "src/hooks/folders/useFolderMutation";
import InlineAlert from "../InlineAlert";

const EditFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: IFolderList;
}> = ({ folder, folderModal, setFolderModal }) => {
  const [updateFolder, setUpdateFolder] = useState<IMutateFolder>({
    folder_name: folder.folder_name,
    folder_id: folder.folder_id,
  });

  const { editFolder, deleteFolder } = useFolderMutation(
    updateFolder,
    setFolderModal
  );

  return (
    <ComposedModal
      size="sm"
      modalHeading="Modal heading"
      modalLabel="Label"
      open={folderModal}
      onClose={() => setFolderModal(false)}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader title="Edit Folder" />
      <ModalBody hasForm>
        <TextInput
          data-modal-primary-focus
          labelText="Name"
          value={updateFolder.folder_name}
          placeholder="e.g. Project Axon"
          type="text"
          name="folder_name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdateFolder({
              ...updateFolder,
              [e.target.name]: e.target.value,
            })
          }
          invalid={
            (editFolder.status === "error" ||
              deleteFolder.status === "error") &&
            true
          }
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
        {(editFolder.status === "error" || deleteFolder.status === "error") && (
          <InlineAlert text="There was an error updating your folder. Please try again later." />
        )}
      </ModalBody>
      <ModalFooter>
        <AxonButton
          kind="secondary"
          onClick={() =>
            deleteFolder.mutate(`folder?folder_id=${folder.folder_id}`)
          }
        >
          {deleteFolder.status === "loading" ? <AxonInlineLoader /> : "Delete"}
        </AxonButton>
        <AxonButton
          kind="primary"
          onClick={() =>
            editFolder.mutate(`folder?folder_id=${folder.folder_id}`)
          }
        >
          {editFolder.status === "loading" ? (
            <AxonInlineLoader />
          ) : (
            "Confirm Changes"
          )}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EditFolder;
