import { Box, themeGet } from "@primer/react";
import styled from "styled-components";

export const NodePanelBox = styled(Box)`
  position: absolute;
  min-height: 150px;
  width: 40px;
  top: 120px;
  left: 10px;
  background-color: ${themeGet("colors.bg.default")};
  border: 1px solid ${themeGet("colors.border.default")};
  border-radius: 6px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
