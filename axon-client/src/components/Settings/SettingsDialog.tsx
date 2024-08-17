import { forwardRef } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import Tabs from "../Tabs";
import { CiPalette } from "react-icons/ci";
import { BaseDialogProps } from "../Dialog/index.types";
import AppTheme from "./components/AppTheme";
import AppColors from "./components/AppColors";

const SettingsDialog = forwardRef(
  ({ openModal, closeModalFn }: BaseDialogProps, ref) => {
    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={closeModalFn}
        aria-labelledby="Axon Settings Dialog"
        wide
        sx={{
          width: "60%",
          overflowY: "hidden",
          minHeight: "50vh",
        }}
      >
        <DialogHeader
          id={"axon-settings-dialog-header"}
          header={"Axon Settings"}
          subheading={`Change default settings`}
        />
        <Tabs
          name="Axon Settings"
          headers={[
            {
              label: "Theme",
              icon: <CiPalette size={18} />,
            },
            {
              label: "Colors",
              icon: <CiPalette size={18} />,
            },
          ]}
          content={[
            <DialogBody>
              <AppTheme />
            </DialogBody>,
            <DialogBody>
              <AppColors />
            </DialogBody>,
          ]}
        ></Tabs>
        <DialogFooter></DialogFooter>
      </DialogContainer>
    );
  }
);

export default SettingsDialog;
