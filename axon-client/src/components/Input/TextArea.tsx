import { BorderStyles } from "src/types/node";
import styled from "styled-components";

export const TextArea = styled.textarea`
  all: unset;
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? "not-allowed" : "text"};
  background-color: ${(props: { background: string }) => props.background};
  color: ${(props: { color: string }) => props.color};
  text-align: ${(props: { textalign: string }) => props.textalign};
  font-size: ${(props: { fontSize: number }) => `${props.fontSize}px`};
  font-weight: ${(props: { fontWeight: number }) => props.fontWeight};
  padding: ${(props: { padding: number }) => `${props.padding}px`};
  width: ${(props: { width: string }) => `${props.width}px`};
  height: ${(props: { height: string }) => `${props.height}px`};
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
  border: ${(props: { border: string; borderstyle: BorderStyles }) =>
    props.border && `1px ${props.borderstyle} ${props.border}`};
  line-height: 1.2;
  box-sizing: border-box;

  display: block;
  margin-left: ${(props: { margin: number }) => `${props.margin}px`};
  margin-top: ${(props: { margin: number }) => `${props.margin}px`};
  margin-bottom: ${(props: { margin: number }) => `${props.margin}px`};
  margin-right: ${(props: { margin: number }) => `${props.margin}px`};

  :disabled {
  }
  :hover {
  }

  // Disable scrollbars
  overflow-x: auto;
  overflow-y: auto;
  display: block;
  ::-webkit-scrollbar {
    display: none;
  }
`;
