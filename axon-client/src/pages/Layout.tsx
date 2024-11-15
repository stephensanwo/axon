import { Fragment, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppContext from "src/context/app";
import { MobileWarningDiv } from "src/shared/layout";
import { Toaster } from "src/components/Common/Toast/toaster";
const Layout = () => {
  const { showMobileWarning, setShowMobileWarning } = useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);

  return (
    <>
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
          <Toaster />
        </Fragment>
      )}
    </>
  );
};

export default Layout;
