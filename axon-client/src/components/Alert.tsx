import React, { useEffect, useState } from "react";
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

export const AlertContainer = styled.div`
  background-color: transparent;
  position: absolute;
  top: 47px;
  width: 100%;
`;

interface AlertDataProps {
  alerts: Array<AlertData>;
}

export interface AlertData {
  title: string;
  detail: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  subtitle,
  kind,
  hideCloseButton,
  lowContrast,
}) => {
  return (
    <ToastNotification
      kind={kind}
      title={title}
      lowContrast={lowContrast}
      subtitle={subtitle ?? ""}
      style={{ width: "100%", maxWidth: "100%", maxHeight: "50px" }}
      hideCloseButton={hideCloseButton}
      timeout={5000}
    ></ToastNotification>
  );
};
