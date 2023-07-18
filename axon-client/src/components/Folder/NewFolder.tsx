import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
  Button,
} from "@carbon/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CREATE_NEW_FOLDER } from "src/api/queries/folder";
import FolderContext from "src/context/folder";
import { ICreateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";

const NewFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ folderModal, setFolderModal }) => {
  const [newFolder, setNewFolder] = useState<ICreateFolder>({
    folder_name: "",
  });
  const [formErros, setFormErrors] = useState<ICreateFolder>({
    folder_name: "",
  });

  const { folderDispatch } = useContext(FolderContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => CREATE_NEW_FOLDER(newFolder),
    onSuccess: (res: any) => {
      console.log(res);
      folderDispatch({
        type: "new_folder",
        payload: {
          folder_id: res.data,
          name: newFolder.folder_name,
        },
      });
      setFolderModal(false);
    },
    onError: (err: any) => {
      console.log(err);
      setFormErrors(err.response.data?.fields);
    },
  });

  const handleNewFolder = () => {
    mutate();
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
      <ModalHeader title="New Folder Group" />
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
          invalid={formErros.folder_name && true}
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
          {isLoading ? <AxonInlineLoader /> : "OK"}
        </AxonButton>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NewFolder;
