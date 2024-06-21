import { ActionList, Text, useTheme } from "@primer/react";
import React, { useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";
import { AppOptionsProps } from "src/types/app";
import { AppOptionsModals } from "./index.types";

function AppOptions() {
  const { theme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [appOptionsDialog, setAppOptionsDialog] =
    useState<AppOptionsProps | null>(null);

  const renderModal = (modalKey: AppOptionsProps) => {
    if (modalKey === null) return null;
    return React.createElement(AppOptionsModals[modalKey], {
      appOptionsDialog,
      setAppOptionsDialog,
      ref: buttonRef,
    });
  };

  return (
    <>
      <ActionList
        sx={{
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        <ActionList.Item
          sx={{
            margin: 0,
            width: "100%",
            display: "flex",
          }}
          onClick={() => setAppOptionsDialog("settings")}
        >
          <ActionList.LeadingVisual>
            <CiSettings fill={theme?.colors.text.gray} size={18} />
          </ActionList.LeadingVisual>
          <Text
            sx={{
              fontSize: 1,
              color: theme?.colors.text.gray,
              fontWeight: "bold",
            }}
          >
            {"Settings"}
          </Text>
        </ActionList.Item>
        <ActionList.Item
          sx={{
            margin: 0,
            width: "100%",
            display: "flex",
          }}
          onClick={() => setAppOptionsDialog("user")}
        >
          <ActionList.LeadingVisual>
            <PiUserCircleLight fill={theme?.colors.text.gray} size={18} />
          </ActionList.LeadingVisual>
          <Text
            sx={{
              fontSize: 1,
              color: theme?.colors.text.gray,
              fontWeight: "bold",
            }}
          >
            {"My Account"}
          </Text>
        </ActionList.Item>
      </ActionList>
      {appOptionsDialog !== null && renderModal(appOptionsDialog)}
    </>
  );
}

export default AppOptions;
