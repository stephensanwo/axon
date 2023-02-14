import React from "react";
import {
  Settings20,
  Notification20,
  User20,
  AppSwitcher20,
} from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenuButton,
} from "carbon-components-react";
import AppContext from "../context/app";
import styled from "styled-components";
import axonLogoSmall from "../assets/icons/axon-logo-small.svg";

interface Props {
  isHeaderMenu?: boolean;
}

const ProfileImage = styled.div`
  width: 60px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;

const StyledHeader: React.FC<Props> = ({ isHeaderMenu }) => {
  const { isSideNavExpanded, onClickSideNavExpand } =
    React.useContext(AppContext);

  const handleSideNav = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSideNavExpanded === true) {
      onClickSideNavExpand(false);
    } else {
      onClickSideNavExpand(true);
    }
  };

  return (
    <div className="container">
      <Header aria-label="">
        {isHeaderMenu ? (
          <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={handleSideNav}
            isActive={isSideNavExpanded}
          />
        ) : (
          <> </>
        )}
        <HeaderName href="/" prefix="" style={{ marginLeft: "15px" }}>
          <img src={axonLogoSmall} alt="axon-logo" />
        </HeaderName>
        <HeaderGlobalBar>
          <ProfileImage>
            <img
              src="https://avatars.githubusercontent.com/u/49814040?v=4"
              alt="Profile"
            />
          </ProfileImage>
        </HeaderGlobalBar>
      </Header>
    </div>
  );
};

export default StyledHeader;
