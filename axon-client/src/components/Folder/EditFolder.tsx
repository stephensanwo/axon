import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
  Button,
} from "@carbon/react";
import { useContext, useEffect, useState } from "react";
import FolderContext from "src/context/folder";
import { ICreateFolder, IFolderList } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useDataDeletion, useDataUpdate } from "src/hooks/useDataMutation";

const EditFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: IFolderList;
}> = ({ folder, folderModal, setFolderModal }) => {
  const [updateFolder, setUpdateFolder] = useState<ICreateFolder>({
    folder_name: folder.folder_name,
  });

  const { folders, folderDispatch } = useContext(FolderContext);

  const {
    loading: editFolderLoading,
    error: editFolderError,
    update,
  } = useDataUpdate<ICreateFolder>(`folder?folder_id=${folder.folder_id}`);

  const {
    loading: deleteFolderLoading,
    error: deleteFolderError,
    delete: deletefn,
  } = useDataDeletion<ICreateFolder>(`folder?folder_id=${folder.folder_id}`);

  const editFolder = () => {
    setFolderModal(false);
    update(updateFolder);
    folderDispatch({
      type: "EDIT_FOLDER",
      payload: {
        folder_id: folder.folder_id,
        folder_name: updateFolder.folder_name,
      },
    });
  };

  const deleteFolder = () => {
    if (window.confirm(`Are you sure you want to delete this folder?`)) {
      setFolderModal(false);
      deletefn();
      folderDispatch({
        type: "DELETE_FOLDER",
        payload: {
          folder_id: folder.folder_id,
        },
      });
    }
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
          invalid={editFolderError && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={deleteFolder}>
          {deleteFolderLoading ? <AxonInlineLoader /> : "Delete"}
        </AxonButton>
        <AxonButton kind="primary" onClick={() => editFolder()}>
          {editFolderLoading ? <AxonInlineLoader /> : "Confirm Changes"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EditFolder;
