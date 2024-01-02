import { ThemeColors } from "src/shared/themes";
import styled from "styled-components";
import { Close } from "@carbon/icons-react";

export const PageHeaderContainer = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${ThemeColors.bgDark};
  border-bottom: 0.5px solid ${ThemeColors.border};
  overflow: scroll;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const NavButton = styled.div`
  width: 250px;
  height: 35px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  border-right: 1px solid ${ThemeColors.border};
  background-color: ${(props: { isActive: boolean }) =>
    props.isActive ? ThemeColors.bgDark2 : ThemeColors.bgDark};

  :first-child {
    border-left: 1px solid ${ThemeColors.border};
  }

  & div:first-child {
    flex-grow: 1;
    overflow: hidden;

    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${ThemeColors.textDark};
    }
  }
  small {
    color: ${(props: { isActive: boolean }) =>
      props.isActive ? ThemeColors.white : ThemeColors.textDark};
  }
  :hover {
    background-color: ${ThemeColors.bgDark2};
  }
`;

export const NavCloseButton = styled.div`
  :hover {
    background-color: ${ThemeColors.bgHighlight1};
  }
`;
