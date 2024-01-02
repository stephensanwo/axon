import { Fragment, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Theme } from "@carbon/react";
import AppContext from "src/context/app";
import { MobileWarningDiv } from "src/shared/layout";
import Header from "src/components/Header";

const Layout = () => {
  const { showMobileWarning, setShowMobileWarning } = useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);

  return (
    <Theme theme="g100">
      <Header />
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
        </Fragment>
      )}
    </Theme>
  );
};

export default Layout;
