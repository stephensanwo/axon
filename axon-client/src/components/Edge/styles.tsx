import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const EdgeLabel = styled.div`
  height: 14px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: text;
`;
export const EditableLabel = styled.input`
  all: unset;
  background-color: transparent;
  outline: none;
  color: white;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Show ellipsis for overflow text */
  max-width: 100%; /* Limit the width of the container */
  max-height: 100%;
  :focus {
    outline: 1px solid ${ThemeColors.primary};
  }
`;

export const EdgeButton = styled.button.attrs(
  (props: { isEdgeOptions: boolean }) => props
)`
  background: ${ThemeColors.bgDark2};
  border: none;
  color: ${ThemeColors.white};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isEdgeOptions = false }) => (isEdgeOptions ? "100%" : "24px")};
  height: 24px;
  border-radius: ${({ isEdgeOptions = false }) =>
    isEdgeOptions ? "25px" : "50%"} !important;

  :hover {
    box-shadow: 0 0 0 1px ${ThemeColors.primary};
  }
`;

export const EdgeButtonForeignObject = styled.foreignObject`
  > body {
    background: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const foreignObjectSize = 60;
export const labelObjectSize = 150;
