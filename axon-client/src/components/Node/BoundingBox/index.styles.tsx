import styled from "styled-components";

export const BoundingBoxWrapper = styled.div`
  background-color: ${(props: { background: string }) => props.background};
  width: ${(props: { width: string }) => `${props.width}px`};
  height: ${(props: { height: string }) => `${props.height}px`};
  border: ${(props: { border: string }) =>
    props.border && `1px solid ${props.border}`};
  box-sizing: border-box;
  border-radius: ${(props: { borderradius: string }) => props.borderradius};
`;
