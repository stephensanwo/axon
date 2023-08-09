import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "src/context/auth";
import NoteItem from "../Notes";

const RequireAuth = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user?.email);
  const location = useLocation();
  if (user === undefined) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <NoteItem />;
  }
};

export default RequireAuth;
