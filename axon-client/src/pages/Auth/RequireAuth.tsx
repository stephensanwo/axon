import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "src/context/auth";
import Notes from "../App";

const RequireAuth = () => {
  const { user } = useContext(AuthContext);
  console.log("Require Auth", user);
  const location = useLocation();
  if (user === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } 
};

export default RequireAuth;
