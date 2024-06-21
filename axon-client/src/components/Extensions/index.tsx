import { forwardRef, useCallback } from "react";
import { Box, IconButton } from "@primer/react";
import { PiPushPinFill } from "react-icons/pi";
import {
  DialogBody,
  DialogContainer,
  DialogHeader,
} from "src/components/Dialog";
import { NoteMenuDialogProps } from "src/types/notes";
import Card from "src/components/Card";
import { useAppContext } from "src/hooks/app";
import { useExtensions } from "src/hooks/notes/useExtensions";
import { ExtensionNodes } from "./ExtensionNodes";

const Extensions = forwardRef<HTMLButtonElement, NoteMenuDialogProps>(
  (props, ref) => {
    const { noteMenuDialog, closeNoteMenuDialog } = props;
    const onDialogClose = useCallback(() => closeNoteMenuDialog(null), []);
    const { extensions } = useAppContext();
    const { addExtension, removeExtension } = useExtensions();

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={noteMenuDialog}
        onDismiss={onDialogClose}
        aria-labelledby="Note publish dialog"
        wide
      >
        <DialogHeader
          id={"note-extensions-heading"}
          header={"Extensions"}
          subheading={`Add extensions to your note`}
        />
        <DialogBody>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {ExtensionNodes.map((nodeOption, index) => {
              const cardWidth = `${(640 - 32 - 16) / 3}px`;
              const isSelected = extensions.has(nodeOption.nodeType);
              return (
                <Card
                  key={index}
                  width={cardWidth}
                  disabled={nodeOption.disabled}
                >
                  <Card.Icon>
                    <>
                      {nodeOption.icon}
                      <IconButton
                        name={`${nodeOption.id}-icon`}
                        onClick={(e) => {
                          e.stopPropagation();
                          isSelected
                            ? removeExtension(nodeOption.nodeType, extensions)
                            : addExtension(nodeOption.nodeType, extensions);
                        }}
                        size="medium"
                        icon={PiPushPinFill}
                        variant="invisible"
                        aria-label={"Pin Node"}
                        inactive={isSelected}
                        disabled={nodeOption.disabled}
                      />
                    </>
                  </Card.Icon>
                  <Card.Header>{nodeOption.name}</Card.Header>
                  <Card.Body>{nodeOption.description}</Card.Body>
                </Card>
              );
            })}
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);

export default Extensions;
