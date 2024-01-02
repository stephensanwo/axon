import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const NodePanelWrapper = styled.div`
  position: absolute;
  min-height: 150px;
  width: 45px;
  top: 100px;
  left: 10px;
  background-color: ${ThemeColors.bgDark2};
  border-radius: 8px;
  z-index: 100;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
