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
import NodeSettings from "../Node/NodeSettings";
import { useSettingsContext } from "src/context/settings/hooks/useSettingsContext";
import EdgeSettings from "../Edge/EdgeSettings";

const SettingsDialog = forwardRef(
  ({ openModal, closeModalFn }: BaseDialogProps, ref) => {
    const { settingsState, settingsStateDispatch } = useSettingsContext();
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
            {
              label: "Nodes",
              icon: <CiPalette size={18} />,
            },
            {
              label: "Edges",
              icon: <CiPalette size={18} />,
            },
          ]}
          content={[
            <DialogBody>
              <AppTheme />
            </DialogBody>,
            <DialogBody>
              <AppColors
                settingsState={settingsState}
                settingsStateDispatch={settingsStateDispatch}
              />
            </DialogBody>,
            <DialogBody>
              <NodeSettings
                settingsState={settingsState}
                settingsStateDispatch={settingsStateDispatch}
              />
            </DialogBody>,
            <DialogBody>
              <EdgeSettings
                settingsState={settingsState}
                settingsStateDispatch={settingsStateDispatch}
              />
            </DialogBody>,
          ]}
        ></Tabs>
      </DialogContainer>
    );
  }
);

export default SettingsDialog;
