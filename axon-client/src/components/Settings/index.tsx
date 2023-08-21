import React, { useContext } from "react";
import styled from "styled-components";
import { SidePanelOpen, TableSplit, TableAlias } from "@carbon/icons-react";
import { ThemeColors } from "src/shared/themes";
import { IconButton, Toggle } from "@carbon/react";
import AppContext from "src/context/app";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const NoteStyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #393939;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  width: 100%;
  background-color: ${ThemeColors.bgDark};
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsContent = styled.div`
  flex: 1;
  padding: 16px;
  margin-top: 30px;
`;

const SettingsContentHeader = styled.h6`
  margin-bottom: 16px;
  color: ${ThemeColors.textDark};
`;

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

interface SettingsProps {
  header: string;
  toggleClose: () => void;
}

const Settings: React.FC<SettingsProps> = (props) => {
  const { appSettings, setAppSettings } = useContext(AppContext);
  console.log("A", appSettings);
  return (
    <SettingsContainer>
      <NoteStyleHeader>
        <div></div>
        <small>{props.header}</small>
        <HeaderIcons>
          <IconButton
            size="md"
            focusTrap={false}
            iconDescription={"Close"}
            key={1}
            ariaLabel="Close"
            onClick={props.toggleClose}
            disabled={false}
            kind="secondary"
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
            <SidePanelOpen size="16" style={{ cursor: "pointer" }} />
          </IconButton>
        </HeaderIcons>
      </NoteStyleHeader>
      <SettingsContent>
        <SettingsContentHeader>Note Settings</SettingsContentHeader>
        <SettingsItem>
          <TableSplit fill={ThemeColors.bgLight} size={16} />
          <p>Note Only Mode</p>
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelA="Off"
            labelB="On"
            id="toggle-1"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
        </SettingsItem>
        <SettingsContentHeader>Markdown Settings</SettingsContentHeader>
        <SettingsItem>
          <TableSplit fill={ThemeColors.bgLight} size={16} />
          <p>Render Preview</p>
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelA="Off"
            labelB="On"
            id="toggle-1"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
        </SettingsItem>
        <SettingsContentHeader>Axon Flow Settings</SettingsContentHeader>
        <SettingsItem>
          <TableSplit fill={ThemeColors.bgLight} size={16} />
          <p>Show Axon Grid</p>
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelA="Off"
            labelB="On"
            id="toggle-1"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
        </SettingsItem>
        <SettingsItem>
          <TableAlias fill={ThemeColors.bgLight} size={16} />
          <p>Snap to Grid</p>
          <Toggle
            size="sm"
            aria-label="toggle button"
            labelA="Off"
            labelB="On"
            id="toggle-1"
            onToggle={() =>
              setAppSettings({
                ...appSettings,
                grid: appSettings.grid === true ? false : true,
              })
            }
            toggled={appSettings.grid}
          />
        </SettingsItem>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
