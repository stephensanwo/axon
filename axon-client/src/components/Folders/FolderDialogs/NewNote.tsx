import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Button, FormControl, TextInput } from "@primer/react";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { IFolderList } from "src/types/folders";
import { Spinner } from "src/components/Loader/Spinner";
import { IMutateNote } from "src/types/notes";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";
import { useFolderMenuContext } from "../FolderMenuContext";

const NewNote = forwardRef<HTMLButtonElement, IFolderList>((folder, ref) => {
  const { folder_name, folder_id } = folder;
  const { folderDialog, setFolderDialog, theme } = useFolderMenuContext();
  const onDialogClose = useCallback(() => setFolderDialog(null), []);

  const [newNote, setNewNote] = useState<IMutateNote>({
    folder_id: folder_id,
    description: "No additional info",
    note_name: "Untitled Note",
    note_id: "",
  });
  const { createNote } = useNoteMutation(newNote);

  useEffect(() => {
    if (createNote.status === "success") {
      setFolderDialog(null);
    }
  }, [createNote.status]);

  return (
    <DialogContainer
      returnFocusRef={ref}
      isOpen={folderDialog}
      onDismiss={onDialogClose}
      aria-labelledby="new note dialog"
    >
      <DialogHeader
        id={"new-note"}
        header={"New Note"}
        subheading={`${folder_name} / ${newNote?.note_name}`}
      />
      <DialogBody>
        <Box as="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <TextInput
                name="note_name"
                value={newNote.note_name}
                placeholder="Note name"
                sx={{
                  backgroundColor: theme?.colors.bg.variant2,
                }}
                block
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewNote({
                    ...newNote,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <TextInput
                name="description"
                value={newNote.description}
                placeholder="Add note description"
                sx={{
                  backgroundColor: theme?.colors.bg.variant2,
                }}
                block
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewNote({
                    ...newNote,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              {createNote.status === "error" && (
                <FormControl.Validation variant="error">
                  There was an error creating your note. Please provide a name
                  and decription and try again.
                </FormControl.Validation>
              )}
            </FormControl>
          </Box>
        </Box>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          onClick={() => createNote.mutate("note")}
          trailingVisual={
            createNote.status === "loading" ? Spinner : CheckCircleFillIcon
          }
          //   disabled={newFolder.folder_name.length > 0 ? false : true}
        >
          Create Note
        </Button>
      </DialogFooter>
    </DialogContainer>
  );
});

export default NewNote;
