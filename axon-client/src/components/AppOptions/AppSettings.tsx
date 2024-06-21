import { forwardRef, useCallback } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogHeader,
} from "src/components/Dialog";
import { AppOptionsDialogProps } from "src/types/app";

import Tabs from "../Tabs";
import { CiPalette } from "react-icons/ci";
import AppTheme from "./AppTheme";

const AppSettings = forwardRef<HTMLButtonElement, AppOptionsDialogProps>(
  (props, ref) => {
    const { appOptionsDialog, setAppOptionsDialog } = props;
    const onDialogClose = useCallback(() => setAppOptionsDialog(null), []);

    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={appOptionsDialog}
        onDismiss={onDialogClose}
        aria-labelledby="Axon settings dialog"
        wide
      >
        <DialogHeader
          id={"axon-settings-heading"}
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
          ]}
          content={[
            <DialogBody>
              <AppTheme />
            </DialogBody>,
          ]}
        ></Tabs>
        <DialogFooter></DialogFooter>
      </DialogContainer>
    );
  }
);

export default AppSettings;
