import { forwardRef, useCallback, useRef } from "react";
import { Box, Button, FormControl, TextInput, useTheme } from "@primer/react";
import { CopyIcon } from "@primer/octicons-react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { useNoteContext } from "src/hooks/notes/useNoteContext";
import { useNoteMutation } from "src/hooks/notes/useNoteMutation";
import { NoteMenuDialogProps } from "src/types/notes";
import { BASE_URL } from "src/config";
import { Spinner } from "src/components/Loader/Spinner";

const PublishNote = forwardRef<HTMLButtonElement, NoteMenuDialogProps>(
  (props, ref) => {
    const { noteMenuDialog, closeNoteMenuDialog } = props;
    const onDialogClose = useCallback(() => closeNoteMenuDialog(null), []);
    const { publicId } = useNoteContext();
    const { publishPublicNote } = useNoteMutation(props.note);
    const { theme } = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    const copyToClipboard = async () => {
      try {
        if (inputRef.current) {
          await navigator.clipboard.writeText(inputRef.current.value);
        }
      } catch (err) {}
    };

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={noteMenuDialog}
        onDismiss={onDialogClose}
        aria-labelledby="Note publish dialog"
      >
        <DialogHeader
          id={"note-publish-heading"}
          header={"Publish Note"}
          subheading={`Share your note with the world!`}
        />
        <DialogBody>
          <Box>
            <FormControl>
              <FormControl.Label>Public Url</FormControl.Label>

              <TextInput
                ref={inputRef}
                name="public-url"
                value={
                  publicId?.length!! > 0
                    ? `${BASE_URL() + "public/note/" + publicId}`
                    : "Click share to display url"
                }
                placeholder="Public Url"
                sx={{
                  backgroundColor: theme?.colors.bg.variant2,
                }}
                monospace
                block
                readOnly
                size="large"
                trailingAction={
                  <Box
                    onClick={copyToClipboard}
                    sx={{
                      marginLeft: "8px",
                      marginRight: "16px",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <CopyIcon size={16} />
                  </Box>
                }
              />
            </FormControl>
            <DialogFooter>
              <Box
                sx={{
                  dislay: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="primary"
                  onClick={() =>
                    publishPublicNote.mutate("publish-public-note")
                  }
                  trailingVisual={publishPublicNote.isLoading ? Spinner : null}
                  disabled={
                    publicId || publishPublicNote.isLoading ? true : false
                  }
                  sx={{
                    mb: "16px",
                    width: "100%",
                  }}
                >
                  Publish Note
                </Button>
                <FormControl>
                  <FormControl.Caption>
                    ⚠️ Note that anyone with the public url will be able to view
                    the note. Sharing notes privately is not yet supported.
                  </FormControl.Caption>
                </FormControl>
              </Box>
            </DialogFooter>
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);

export default PublishNote;
