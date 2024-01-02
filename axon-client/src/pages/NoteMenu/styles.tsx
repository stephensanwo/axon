import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";
import { SidePanelClose, SidePanelOpen } from "@carbon/icons-react";
import { HeaderPanel } from "@carbon/react";

export const StyledHeaderPanel = styled(HeaderPanel)`
  min-width: ${(props: { width: number }) => `${props.width}px`};
  background-color: ${ThemeColors.bgDark};
  border-left: ${(props: { noteMenuPanel: string }) =>
    props.noteMenuPanel !== null && `1px solid ${ThemeColors.border};`};
  border-right: none;
  margin-right: ${(props: { isDrawable: boolean }) =>
    props.isDrawable && "47px"};
  overflow-y: scroll;
  top: 35px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  height: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 24px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OptionsContainerHeader = styled.h6`
  margin-bottom: 16px;
  color: ${ThemeColors.textDark};
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize ? props.fontSize : "16px"};
`;

export const OptionsHeader = styled.div`
  position: absolute;
  height: 34px;
  width: 34px;
  padding: 8px;
`;

export const DraggableHandleOpen = styled(SidePanelClose)`
  width: 18px;
  height: 18px;
  cursor: pointer;

  :hover {
    fill: ${ThemeColors.primary};
  }
`;

export const DraggableHandleClose = styled(SidePanelOpen)`
  width: 18px;
  height: 18px;
  cursor: pointer;

  :hover {
    fill: ${ThemeColors.primary};
  }
`;

export const NavActions = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
