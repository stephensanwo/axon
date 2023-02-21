import React, { useContext } from "react";
import { OverflowMenu, OverflowMenuItem, Tag } from "@carbon/react";
import styled from "styled-components";
import "./style.scss";
import AppContext from "../../context/app";
import { StateColors, ThemeColors } from "../../shared/themes";

interface PageHeaderProps {
  headerText: string;
  theme?: "dark" | "light";
  documentTitle: string;
  headerMenu?: Array<{
    menuText: string;
    menuIcon: React.ReactNode;
    menuOptions: Array<{
      text: string;
      className: string;
      isDisabled: boolean;
      isDelete: boolean;
    }>;
  }>;
}
export const PageHeaderContainer = styled.div`
  background-color: #262626;
  width: 100vw;
  top: 0;
  margin-top: 40px;
  position: fixed;
  z-index: 9000;
  height: 40px;
  padding-left: ${(props: { expand: boolean }) =>
    props.expand ? "320px" : "0px"};
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavActions = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: center;
`;

const OnlinePresence = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props: { isOnline: boolean }) =>
    props.isOnline ? StateColors.success : StateColors.warning};
`;

const NavDocumentTitle = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { isOnline, isSideNavExpanded } = useContext(AppContext);
  return (
    <PageHeaderContainer expand={isSideNavExpanded && true}>
      <NavMenu>
        <NavActions>
          {props.headerMenu?.map((menu, index) => (
            <OverflowMenu
              data-floating-menu-container
              size="md"
              renderIcon={() => menu.menuIcon}
              id="overflow-menu"
              focusTrap={false}
              iconDescription={menu.menuText}
              key={index}
              ariaLabel="Menu"
            >
              {menu.menuOptions.map((option, index) => (
                <OverflowMenuItem
                  className={option.className}
                  itemText={option.text}
                  disabled={option.isDisabled}
                  isDelete={option.isDelete}
                  key={index}
                />
              ))}
            </OverflowMenu>
          ))}
        </NavActions>
        <NavDocumentTitle>
          <p>{props.documentTitle}</p>
          <OnlinePresence isOnline={isOnline} />
        </NavDocumentTitle>
      </NavMenu>
    </PageHeaderContainer>
  );
};

export default PageHeader;
