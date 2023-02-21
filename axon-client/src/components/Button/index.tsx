import styled from "styled-components";
import { Button as CarbonButton } from "@carbon/react";
import { ThemeColors } from "shared/themes";

export const AxonButton = styled(CarbonButton)`
  margin-top: 40px;
  max-width: 300px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
  text-decoration: none;
  background-color: ${ThemeColors.primary};
  color: #000;

  :hover {
    text-decoration: none;
    color: #000;
    background-color: ${ThemeColors.primaryHover};
  }
`;
