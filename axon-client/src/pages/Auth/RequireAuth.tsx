import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AppContext from "src/context/app";

const RequireAuth = () => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
