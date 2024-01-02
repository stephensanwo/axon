import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";

export const FloatingMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${ThemeColors.bgDark2};
  padding: 4px;
  height: 32px;
  /* min-height: 80px; */
  /* top: 40px; */
  /* padding: 4px;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000000; */
  /* opacity: 0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s;
  min-height: 40px;
  will-change: transform; */
  border-radius: ${(props: { showDropdown: string }) =>
    props.showDropdown !== null ? "8px 8px 0px 0px" : "8px"};
  /* border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px; */
  border-bottom: ${(props: { showDropdown: string }) =>
    props.showDropdown !== null && `1px dashed ${ThemeColors.border}`};

  div[data-floating-menu] {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 24px;
  }

  div[data-floating-menu-dropdown="visible"] {
    /* height: 100px; */
    min-height: 32px;
    position: absolute;
    top: calc(24px + 4px + 4px);
    left: 0;
    width: 100%;
    background-color: ${ThemeColors.bgDark2};
    border-radius: 8px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    display: flex;
    flex-direction: column;
    padding: 8px;

    [data-floating-menu-dropdown-header] {
      color: ${ThemeColors.textDark};
      margin-bottom: 8px;
    }
  }

  div[data-floating-menu-dropdown="hidden"] {
    display: none;
  }

  div[data-floating-menu-item-flex] {
    display: flex;
  }
`;
