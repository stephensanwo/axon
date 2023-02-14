import React from "react";
import { Outlet } from "react-router-dom";
import StyledHeader from "./StyledHeader";

const Layout = () => {
  return (
    <main>
      <StyledHeader isHeaderMenu={true} />
      <Outlet />
    </main>
  );
};

export default Layout;
