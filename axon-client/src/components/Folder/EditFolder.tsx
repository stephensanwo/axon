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
import { DELETE_FOLDER, EDIT_NEW_FOLDER } from "api/queries/folder";
import FolderContext from "context/folder";
import { CreateFolderProps, FolderListProps } from "types/folders";
import { AxonButton } from "components/Button";
import AxonInlineLoader from "components/Loader/InlineLoader";

const EditFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder: FolderListProps;
}> = ({ folder, folderModal, setFolderModal }) => {
  const [updateFolder, setUpdateFolder] = useState<CreateFolderProps>({
    folder_name: folder.name,
  });
  const [formErros, setFormErrors] = useState<CreateFolderProps>({
    folder_name: "",
  });

  console.log(updateFolder);
  const { folderDispatch } = useContext(FolderContext);

  const editFolder = useMutation({
    mutationFn: () => EDIT_NEW_FOLDER(updateFolder, folder.folder_id),
    onSuccess: (res: any) => {
      console.log(res);
      folderDispatch({
        type: "edit_folder",
        payload: {
          folder_id: res.data,
          name: updateFolder.folder_name,
        },
      });

      setFolderModal(false);
    },
    onError: (err: any) => {
      setFormErrors(err.response.data?.fields);
    },
  });

  const deleteFolder = useMutation({
    mutationFn: () => DELETE_FOLDER(folder.folder_id),
    onSuccess: (res: any) => {
      console.log(res);
      folderDispatch({
        type: "delete_folder",
        payload: {
          folder_id: folder.folder_id,
        },
      });

      setFolderModal(false);
    },
    onError: (err: any) => {
      setFormErrors(err.response.data?.fields);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this folder?`)) {
      deleteFolder.mutate();
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
      <ModalHeader title="Edit Folder Group" />
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
          invalid={formErros.folder_name && true}
          invalidText={"Invalid data provided"}
        />
        <div style={{ marginTop: "20px" }}></div>
      </ModalBody>
      <ModalFooter>
        <AxonButton kind="secondary" onClick={() => setFolderModal(false)}>
          Cancel
        </AxonButton>
        <AxonButton kind="danger" onClick={handleDelete}>
          Delete
        </AxonButton>
        <AxonButton kind="primary" onClick={() => editFolder.mutate()}>
          {editFolder.isLoading ? <AxonInlineLoader /> : "Confirm Changes"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default EditFolder;
