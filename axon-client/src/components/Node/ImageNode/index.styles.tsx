import styled from "styled-components";
import { themeGet } from "@primer/react";

export const ImageNodeContainer = styled.div`
  border: none;
  padding: 0px;
  width: ${(props: { width: string }) => props.width && `${props.width}px`};
  height: ${(props: { height: string }) => props.height && `${props.height}px`};
  border-radius: 8px;
  margin: ${(props: { margin: string }) => props.margin && `${props.margin}px`};
`;

export const ImageNodeInput = styled.div`
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

export const ImageNodeImage = styled.div`
  width: 100%;
  height: 100%;

  & img[data-node-image] {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 8px;
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
  }

  & p[data-node-image-title] {
    font-size: 10px;
    font-weight: 600;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
  }

  & a[data-node-image-href] {
    font-size: 8px;
    margin: 0;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & small[data-node-image-meta] {
    font-size: 8px;
    margin: 0;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${themeGet("colors.text.gray")};
  }
`;
