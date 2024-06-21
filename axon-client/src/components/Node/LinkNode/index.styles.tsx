import styled from "styled-components";
import { themeGet } from "@primer/react";

export const LinkNodeContainer = styled.div`
  border: none;
  padding: 0px;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  border-radius: 8px;
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

export const LinkNodeInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 32px;
  background-color: ${themeGet("colors.bg.variant1")};
  border-radius: 8px;

  & div[data-node-icon] {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${themeGet("colors.bg.variant2")};
    padding: 4px;
    border-radius: 50%;
  }

  & div[data-node-input-container] {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const LinkNodeImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${themeGet("colors.bg.variant1")};
  border-radius: 8px;

  & img[data-node-image] {
    width: 100%;
    height: 65%;
    object-fit: cover;
    border: none;
    outline: none;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  & div[data-node-image-overlay-buttons] {
    width: calc(100% - 16px);
    left: 50%;
    transform: translateX(-50%);
    height: 24px;
    position: absolute;
    top: 8px;
    display: flex;
    justify-content: space-between;
  }

  & div[data-node-image-text] {
    padding: 8px;
    padding-top: 0px;
  }
`;
