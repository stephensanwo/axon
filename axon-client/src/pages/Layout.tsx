import { Fragment, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import StyledHeader from "components/StyledHeader";
import { Theme } from "@carbon/react";
import AppContext from "context/app";
import { MobileWarningDiv } from "shared/layout";

const Layout = () => {
  const { isSignedIn, showMobileWarning, setShowMobileWarning } =
    useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);

  return (
    <Theme theme="g100">
      <StyledHeader />
      {showMobileWarning ? (
        <MobileWarningDiv dark>
          <p>
            <strong>Axon</strong> is not supported on this screen size, Please
            open on a desktop browser
          </p>
        </MobileWarningDiv>
      ) : (
        <Fragment>
          <Outlet />
          {isSignedIn && <Footer />}
        </Fragment>
      )}
    </Theme>
  );
};

export default Layout;
