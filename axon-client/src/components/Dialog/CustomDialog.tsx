import { forwardRef } from "react";
import {
  DialogBody,
  DialogContainer,
  DialogHeader,
} from "src/components/Dialog";
import { BaseDialogProps } from "src/components/Dialog/index.types";

const CustomDialog = forwardRef(
  (
    {
      openModal,
      closeModalFn,
      id,
      header,
      subheading,
      children,
      size,
      dialogContainerStyle,
    }: BaseDialogProps & {
      id: string;
      header: string;
      subheading?: string;
      footer?: React.ReactNode;
      size?: "narrow" | "wide";
      dialogContainerStyle?: React.CSSProperties;
    },
    ref
  ) => {
    return (
      <DialogContainer
        buttonRef={ref}
        isOpen={openModal}
        onDismiss={() => {
          closeModalFn();
        }}
        aria-labelledby={header}
        narrow={size === "narrow"}
        wide={size === "wide"}
        sx={dialogContainerStyle}
      >
        <DialogHeader id={id} header={header} subheading={subheading} />
        <DialogBody>{children}</DialogBody>
      </DialogContainer>
    );
  }
);

export default CustomDialog;
