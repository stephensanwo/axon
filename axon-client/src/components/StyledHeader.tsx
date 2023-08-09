import React, { useContext } from "react";

import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenuButton,
} from "@carbon/react";
import AppContext from "../context/app";
import styled from "styled-components";
import axonLogoSmall from "../assets/icons/axon-logo-small.svg";
import { Link } from "react-router-dom";
import AuthContext from "src/context/auth";

const ProfileImage = styled.div`
  width: 60px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }
`;

const StyledHeader: React.FC = () => {
  const { isSideNavExpanded, onClickSideNavExpand } = useContext(AppContext);
  const { user, isSignedIn } = useContext(AuthContext);

  const handleSideNav = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSideNavExpanded === true) {
      onClickSideNavExpand(false);
    } else {
      onClickSideNavExpand(true);
    }
  };

  return (
    <Header aria-label="">
      {isSignedIn ? (
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={handleSideNav}
          isActive={isSideNavExpanded}
        />
      ) : (
        <> </>
      )}
      <HeaderName to="/" prefix="" style={{ marginLeft: "15px" }} as={Link}>
        <img src={axonLogoSmall} alt="axon-logo" />
      </HeaderName>
      <HeaderGlobalBar>
        {isSignedIn && (
          <ProfileImage>
            <img src={user?.avatar} alt="Profile" />
          </ProfileImage>
        )}
      </HeaderGlobalBar>
    </Header>
  );
};

export default StyledHeader;
