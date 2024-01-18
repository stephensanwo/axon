import styled from "styled-components";
import { ThemeColors } from "src/shared/themes";

export const NodeMenuWrapper = styled.div`
  background-color: ${ThemeColors.bgDark2};
  border-radius: 0px 0px 8px 8px;
  min-height: 60px;
  width: 100%;
  margin-top: 4px;
  z-index: 1000;
`;

export const NodeMenuSelectorContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  border-radius: 8px;
`;

export const NodeMenuSelectorWrapper = styled.div`
  position: absolute;
  margin-top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: ${ThemeColors.bgDark2};
  border-radius: 8px;
  min-width: 120px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

export const NodeMenuHeader = styled.div`
  border-top: ${`1px dashed ${ThemeColors.border}`};
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
`;

export const NodeMenuBody = styled.div`
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const NodeMenuSubHeaders = styled.small`
  font-weight: 400;
  font-size: ${(props: { lg: string }) => (props.lg ? "14px" : "12px")};
  color: ${ThemeColors.textLight};
`;

export const RadioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 8px));
  gap: 8px;
  grid-auto-flow: row;
`;

export const RadioFlex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const NodeMenuItem = styled.div`
  display: flex;
  flex-direction: ${(props: { direction: 1 | 0 }) =>
    props.direction === 1
      ? "column"
      : props.direction === 0
      ? "row"
      : "column"};
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const NodeMenuItemLabel = styled.legend`
  color: ${ThemeColors.textLight};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.32px;
`;
