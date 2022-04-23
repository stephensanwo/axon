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

interface Props {
  isHeaderMenu?: boolean;
}

const StyledHeader: React.FC<Props> = ({ isHeaderMenu }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isSideNavExpanded, onClickSideNavExpand] = React.useState(false);

  const handleAppSwitcher = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isExpanded === true) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleSideNav = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSideNavExpanded === true) {
      onClickSideNavExpand(false);
    } else {
      onClickSideNavExpand(true);
    }
  };

  return (
    <div className="container">
      <Header aria-label="DevNotes">
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
        <HeaderName href="/" prefix="">
          DevNotes
        </HeaderName>
        <HeaderNavigation aria-label="DevNotes">
          <HeaderMenuItem href="/folders/3649fdfhdjcgdb">
            Folders
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Settings" onClick={() => {}}>
            <Settings20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Profile" onClick={() => {}}>
            <User20 />
          </HeaderGlobalAction>
          {/* <HeaderGlobalAction
            aria-label="Command Pallete"
            isActive
            onClick={handleAppSwitcher}
          >
            <AppSwitcher20 />
          </HeaderGlobalAction> */}
        </HeaderGlobalBar>
      </Header>
    </div>
  );
};

export default StyledHeader;
