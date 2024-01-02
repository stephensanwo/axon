import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const EdgeMenuItem = styled.div`
  margin-bottom: 24px;
`;

export const EdgeMenuItemHeader = styled.div`
  > small {
    font-weight: 500;
    font-size: 12px;
    color: ${ThemeColors.textLight};
  }
`;

export const EdgeMenuItemBodyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(24px, 1fr)
  ); /* Adjust 50px to your circle size */
  gap: 8px;
  margin-top: 12px;
`;
