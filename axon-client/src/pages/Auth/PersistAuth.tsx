import { Fragment, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AxonLoader from "src/components/Loader/Loader";
import AuthContext from "src/context/auth";
import { useDataFetching } from "src/hooks/useDataFetching";
import { IUser } from "src/types/user";
import { fetchData, fetchUser } from "src/api/query";
import Notes from "../Notes";

const PersistAuth = () => {
  const { setUser, setIsSignedIn } = useContext(AuthContext);

  const {
    error: authError,
    data: userData,
    loading: loadingUser,
  } = useDataFetching<IUser>("auth-user", () => fetchUser("auth-user"));
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setIsSignedIn(true);
      setUser(userData);
    }
  }, [userData]);

  console.log("authError", authError);
  if (authError) {
    return <Navigate to="/unavailable" state={{ from: location }} replace />;
  }

  return <Fragment>{loadingUser ? <AxonLoader /> : <Notes />} </Fragment>;
};

export default PersistAuth;
