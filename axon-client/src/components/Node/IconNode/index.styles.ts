import { BorderStyles } from "src/types/node";
import styled from "styled-components";

export const IconNodeContainer = styled.div`
  border: none;
  border-radius: 0;
  padding: 0;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  background-color: ${(props: { background: string }) =>
    props.background && props.background};
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
  border: ${(props: { border: string; borderstyle: BorderStyles }) =>
    props.border && `1px ${props.borderstyle} ${props.border}`};
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

export const IconNodeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4px;
`;
