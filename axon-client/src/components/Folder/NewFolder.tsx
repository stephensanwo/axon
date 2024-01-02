import {
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ComposedModal,
} from "@carbon/react";
import { useContext, useState } from "react";
import { IMutateFolder } from "src/types/folders";
import { AxonButton } from "src/components/Button";
import AxonInlineLoader from "src/components/Loader/InlineLoader";
import { useFolderMutation } from "src/hooks/folders/useFolderMutation";
import InlineAlert from "../InlineAlert";
import FolderContext from "src/context/folder";

const NewFolder = () => {
  const [newFolder, setNewFolder] = useState<IMutateFolder>({
    folder_name: "",
    folder_id: "",
  });

  const { createFolder } = useFolderMutation(newFolder);
  const { folderMenu, setFolderMenu } = useContext(FolderContext);

  return (
    <ComposedModal
      size="sm"
      open={folderMenu.newFolder}
      onClose={() => setFolderMenu({ ...folderMenu, newFolder: false })}
      preventCloseOnClickOutside={true}
    >
      <ModalHeader title="Create New Folder" />
      <ModalBody hasForm>
        <TextInput
          id="folder-name"
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
        <AxonButton
          kind="secondary"
          onClick={() => setFolderMenu({ ...folderMenu, newFolder: false })}
        >
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
