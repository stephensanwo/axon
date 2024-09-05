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
import Profile from "./components/Profile";
import Subscription from "./components/Subscription";

const UserDialog = forwardRef(
  ({ openModal, closeModalFn }: BaseDialogProps, ref) => {
    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={closeModalFn}
        aria-labelledby="Global Settings Dialog"
        wide
        sx={{
          width: "60%",
          overflowY: "hidden",
        }}
      >
        <DialogHeader
          id={"global-settings-dialog-header"}
          header={"Axon Settings"}
          subheading={`Change default settings`}
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
          tabContainerStyle={{
            position: "fixed",
            width: "100%",
          }}
        ></Tabs>
      </DialogContainer>
    );
  }
);

export default UserDialog;
