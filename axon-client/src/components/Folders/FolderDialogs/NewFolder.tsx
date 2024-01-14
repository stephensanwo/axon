import { Box, Button, FormControl, TextInput } from "@primer/react";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { IMutateFolder } from "src/types/folders";
import { useFolderMutation } from "src/hooks/folders/useFolderMutation";
import { Spinner } from "src/components/Loader/Spinner";
import { useFolderMenuContext } from "../FolderMenuContext";

const NewFolder = forwardRef<HTMLButtonElement, unknown>((ref) => {
  const { folderDialog, setFolderDialog, theme } = useFolderMenuContext();
  const onDialogClose = useCallback(() => setFolderDialog(null), []);
  const [newFolder, setNewFolder] = useState<IMutateFolder>({
    folder_name: "Untitled Folder",
    folder_id: "",
  });
  const { createFolder } = useFolderMutation(newFolder);

  useEffect(() => {
    if (createFolder.status === "success") {
      setFolderDialog(null);
    }
  }, [createFolder.status]);

  return (
    <DialogContainer
      buttonRef={ref}
      isOpen={folderDialog}
      onDismiss={onDialogClose}
      aria-labelledby="new folder dialog"
    >
      <DialogHeader id={"new-folder"} header={"New Folder"} />
      <DialogBody>
        <Box as="form">
          <FormControl>
            <FormControl.Label>Folder Name</FormControl.Label>
            <TextInput
              name="folder_name"
              value={newFolder.folder_name}
              placeholder="Folder Name"
              sx={{
                backgroundColor: theme?.colors.bg.variant2,
              }}
              block
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewFolder({
                  ...newFolder,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            {createFolder.status === "error" && (
              <FormControl.Validation variant="error">
                There was an error creating your folder. Please provide a name
                and try again.
              </FormControl.Validation>
            )}
          </FormControl>
          <DialogFooter>
            <Button
              variant="primary"
              onClick={() => createFolder.mutate("folder")}
              trailingVisual={
                createFolder.status === "loading"
                  ? Spinner
                  : CheckCircleFillIcon
              }
              disabled={newFolder.folder_name.length > 0 ? false : true}
            >
              Create Folder
            </Button>
          </DialogFooter>
        </Box>
      </DialogBody>
    </DialogContainer>
  );
});

export default NewFolder;
