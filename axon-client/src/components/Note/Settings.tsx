import React, { useContext } from "react";
import styled from "styled-components";
import { SidePanelOpen, TableSplit, TableAlias } from "@carbon/icons-react";
import { ThemeColors } from "src/shared/themes";
import { IconButton, Toggle } from "@carbon/react";
import AppContext from "src/context/app";
import {
  NoteMenuContainer,
  NoteMenuContent,
  NoteMenuContentBody,
  NoteMenuContentHeader,
} from "./styles";

const Settings = () => {
  const { appSettings, setAppSettings } = useContext(AppContext);
  console.log("A", appSettings);
  return (
    <NoteMenuContainer>
      <NoteMenuContent>
        <NoteMenuContentHeader marginBottom={"32px"}>
          <h2>Note Settings</h2>
        </NoteMenuContentHeader>
        <NoteMenuContentBody>
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelText="Toggle Axon Flow Grid Lines"
            labelA="Off"
            labelB="On"
            id="toggle-axon-grid"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelText="Enable Snap Nodes to Grid"
            labelA="Off"
            labelB="On"
            id="toggle-snap-to-grid"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
        </NoteMenuContentBody>
      </NoteMenuContent>
    </NoteMenuContainer>
  );
};

export default Settings;
