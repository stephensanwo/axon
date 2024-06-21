import { Box, Button, FormControl, TextInput } from "@primer/react";
import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { IFolderList, IMutateFolder } from "src/types/folders";
import { useFolderMutation } from "src/hooks/folders/useFolderMutation";
import { Spinner } from "src/components/Loader/Spinner";
import { useFolderMenuContext } from "../FolderMenuContext";

const EditFolder = forwardRef<HTMLButtonElement, IFolderList>((folder, ref) => {
  const { folder_id, folder_name } = folder;
  const { folderDialog, setFolderDialog, theme } = useFolderMenuContext();
  const onDialogClose = useCallback(() => setFolderDialog(null), []);
  const [updateFolder, setUpdateFolder] = useState<IMutateFolder>({
    folder_name: folder_name,
    folder_id: folder_id,
  });
  const { editFolder, deleteFolder } = useFolderMutation(updateFolder);

  useEffect(() => {
    if (editFolder.status === "success") {
      setFolderDialog(null);
    }
    if (deleteFolder.status === "success") {
      setFolderDialog(null);
    }
  }, [editFolder.status]);

  return (
    <DialogContainer
      returnFocusRef={ref}
      isOpen={folderDialog}
      onDismiss={onDialogClose}
      aria-labelledby="edit folder dialog"
    >
      <DialogHeader id={folder_id} header={folder_name} />
      <DialogBody>
        <Box as="form">
          <FormControl>
            <FormControl.Label>Folder Name</FormControl.Label>
            <TextInput
              name="folder_name"
              value={updateFolder.folder_name}
              placeholder="Folder Name"
              sx={{
                backgroundColor: theme?.colors.bg.variant2,
              }}
              block
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateFolder({
                  ...updateFolder,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl>
            {editFolder.status === "error" && (
              <FormControl.Validation variant="error">
                There was an error updating your folder. Please try again.
              </FormControl.Validation>
            )}
          </FormControl>
        </Box>
      </DialogBody>
      <DialogFooter>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="danger"
            onClick={() =>
              deleteFolder.mutate(`folder?folder_id=${folder.folder_id}`)
            }
            trailingVisual={
              deleteFolder.status === "loading" ? Spinner : XCircleFillIcon
            }
          >
            Delete Folder
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              editFolder.mutate(`folder?folder_id=${folder.folder_id}`)
            }
            trailingVisual={
              editFolder.status === "loading" ? Spinner : CheckCircleFillIcon
            }
          >
            Confirm Changes
          </Button>
        </Box>
      </DialogFooter>
    </DialogContainer>
  );
});

export default EditFolder;
