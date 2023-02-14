import React from "react";
import styled from "styled-components";
import { ArrowRight24, ArrowLeft24 } from "@carbon/icons-react";

const SettingsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <ArrowRight24 fill="#1192e8" />
      <ArrowLeft24 fill="#1192e8" />
    </SettingsContainer>
  );
};

export default Settings;
