import React, { forwardRef, useCallback } from "react";
import { Box, Text, ToggleSwitch } from "@primer/react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { NoteMenuDialogProps } from "src/types/notes";
import { useNoteContext } from "src/hooks/notes/useNoteContext";

const NoteSettings = forwardRef<HTMLButtonElement, NoteMenuDialogProps>(
  (props, ref) => {
    const { noteMenuDialog, closeNoteMenuDialog } = props;
    const { noteSettingsOptions, setNoteSettingsOptions } = useNoteContext();
    const onDialogClose = useCallback(() => closeNoteMenuDialog(null), []);

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={noteMenuDialog}
        onDismiss={onDialogClose}
        aria-labelledby="Note settings dialog"
        narrow
      >
        <DialogHeader
          id={"note-settings"}
          header={"Note Settings"}
          subheading={`Change default settings for your note`}
        />
        <DialogBody>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text id="toggle" fontWeight="bold" fontSize={1}>
                Grid Lines
              </Text>
              <ToggleSwitch
                aria-labelledby="toggle grid lines"
                onChange={() =>
                  setNoteSettingsOptions({
                    ...noteSettingsOptions,
                    grid: noteSettingsOptions.grid === true ? false : true,
                  })
                }
                defaultChecked={noteSettingsOptions.grid}
                statusLabelPosition="end"
              />
            </Box>
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);

export default NoteSettings;
