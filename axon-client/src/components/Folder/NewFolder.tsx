import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CREATE_NEW_FOLDER } from "api/queries/folder";
import FolderContext from "context/folder";
import { CreateFolderProps } from "types/folders";

const NewFolder: React.FC<{
  folderModal: boolean;
  setFolderModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ folderModal, setFolderModal }) => {
  const [newFolder, setNewFolder] = useState<CreateFolderProps>({
    folder_name: "",
  });
  const [formErros, setFormErrors] = useState<CreateFolderProps>({
    folder_name: "",
  });

  const { folders, folderDispatch } = useContext(FolderContext);

  console.log(folderModal);

  const mutation = useMutation({
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
    console.log(newFolder);
    mutation.mutate();
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
        <div style={{ marginTop: "20px" }}></div>
      </ModalBody>
      <ModalFooter
        primaryButtonText="OK"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleNewFolder}
        shouldSubmitOnEnter={true}
        onSecondarySubmit={() => setFolderModal(false)}
      />
    </ComposedModal>
  );
};

export default NewFolder;
