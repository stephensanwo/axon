import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "src/components/Common/Toast/toaster";

const Layout = () => {
  return (
    <Fragment>
      <Outlet />
      <Toaster />
    </Fragment>
  );
};

export default Layout;
