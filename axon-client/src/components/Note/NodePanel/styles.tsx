import { Box, themeGet } from "@primer/react";
import styled from "styled-components";

export const NodePanelWrapper = styled(Box)`
  position: absolute;
  min-height: 150px;
  width: 40px;
  top: 120px;
  left: 10px;
  background-color: ${themeGet("colors.bg.variant1")};
  border-radius: 6px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
