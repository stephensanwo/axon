import styled from "styled-components";
import { Button as CarbonButton } from "@carbon/react";
import { StateColors, ThemeColors } from "src/shared/themes";

export const AxonButton = styled(CarbonButton)`
  margin-top: 40px;
  max-width: 300px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
  /* text-decoration: none; */
  background-color: ${(props: { kind: string }) =>
    (props.kind === "primary" && ThemeColors.primary) ||
    (props.kind === "danger" && ThemeColors.dangerAction) ||
    ""} !important;
  color: ${(props: { kind: string }) =>
    (props.kind === "primary" && "#000") || "#fff"} !important;

  :hover {
    text-decoration: none;
    color: #000;
  }
`;
