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
import Subscription from "./Subscription";
import Profile from "./Profile";

const UserSettings = forwardRef<HTMLButtonElement, AppOptionsDialogProps>(
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
          id={"axon-user-settings-heading"}
          header={"User Settings"}
          subheading={`Update your preferences`}
        />
        <Tabs
          name="User Settings"
          headers={[
            {
              label: "Profile",
              icon: <CiPalette size={18} />,
            },
            {
              label: "Subscription",
              icon: <CiPalette size={18} />,
            },
          ]}
          content={[
            <DialogBody>
              <Profile />
            </DialogBody>,
            <DialogBody>
              <Subscription />
            </DialogBody>,
          ]}
        ></Tabs>
        <DialogFooter></DialogFooter>
      </DialogContainer>
    );
  }
);

export default UserSettings;
