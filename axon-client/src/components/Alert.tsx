import React from "react";
import { ToastNotification } from "@carbon/react";
import styled from "styled-components";

interface AlertProps {
  title: string;
  subtitle?: string;
  kind:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  hideCloseButton: boolean;
  lowContrast?: boolean;
}

export const AlertContainer = styled(ToastNotification)`
  position: absolute;
  z-index: 101;
  bottom: 0;
  min-height: 60px;
  width: 100vw;
`;

export const Alert: React.FC<AlertProps> = ({
  title,
  subtitle,
  kind,
  hideCloseButton,
  lowContrast,
}) => {
  return (
    <AlertContainer
      kind={kind}
      title={title}
      lowContrast={lowContrast}
      subtitle={subtitle ?? ""}
      hideCloseButton={hideCloseButton}
      timeout={10000}
    ></AlertContainer>
  );
};
