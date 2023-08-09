import { Fragment, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import StyledHeader from "src/components/StyledHeader";
import { Theme } from "@carbon/react";
import AppContext from "src/context/app";
import { MobileWarningDiv } from "src/shared/layout";
import AuthContext from "src/context/auth";

const Layout = () => {
  const { showMobileWarning, setShowMobileWarning } = useContext(AppContext);

  const { isSignedIn } = useContext(AuthContext);

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
