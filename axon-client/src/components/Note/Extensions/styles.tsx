import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const NodeExtensionItem = styled.div`
  background-color: ${ThemeColors.bgSecondary};
  width: calc((384px - 32px - 16px) / 2);
  height: 160px;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? "not-allowed" : "pointer"};
  padding: 16px;

  :hover {
    background-color: ${(props: { disabled: boolean }) =>
      props.disabled ? "" : ThemeColors.bgHighlight1};
  }
`;

export const NodeExtensionItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
