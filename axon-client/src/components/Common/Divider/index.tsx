import styled from "styled-components";
import { themeGet } from "@primer/react";

export const Divider = styled.hr`
  border-width: 0 0 1px;
  border-style: solid;
  border-color: ${themeGet("colors.border.default")};
  width: 100%;
  margin-top: ${(props: { margin: number }) => `${props.margin}px`};
  margin-bottom: ${(props: { margin: number }) => `${props.margin}px`};
`;

export const HorizontalDivider = styled.div`
  width: 1px;
  background-color: ${themeGet("colors.border.variant1")};
  height: ${(props: { height: number }) => `${props.height}px`};
  margin-left: ${(props: { margin: number }) => `${props.margin}px`};
  margin-right: ${(props: { margin: number }) => `${props.margin}px`};
`;
