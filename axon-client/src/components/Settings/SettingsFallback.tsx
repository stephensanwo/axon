import { forwardRef } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogHeader,
} from "src/components/Dialog";
import { BaseDialogProps } from "../Dialog/index.types";
import { Box } from "@primer/react";

export const SettingsDialogFallback = forwardRef(
  ({ openModal, closeModalFn, children }: BaseDialogProps, ref) => {
    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={closeModalFn}
        aria-labelledby="Global Settings Dialog"
        wide
        sx={{
          width: "60%",
          minHeight: "10vh",
          maxHeight: "50vh",
          overflowY: "hidden",
        }}
      >
        <DialogHeader
          id={"global-settings-dialog-header"}
          header={"Axon Settings"}
          subheading={`Change default settings`}
        />
        <DialogBody>
          <Box
            sx={{
              mt: 3,
              mb: 3,
            }}
          >
            {children}
          </Box>
        </DialogBody>
      </DialogContainer>
    );
  }
);
