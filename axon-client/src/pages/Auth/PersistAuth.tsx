import { Fragment, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import AxonLoader from "src/components/Loader/Loader";
import AuthContext from "src/context/auth";
import Notes from "../Notes";
import { useAuthQuery } from "src/hooks/auth/useAuthQuery";

const PersistAuth = () => {
  const { setUser, setIsSignedIn } = useContext(AuthContext);

  const { userData, userQuery } = useAuthQuery();

  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setIsSignedIn(true);
      setUser(userData);
    }
  }, [userData]);

  if (userQuery.status === "error") {
    return <Navigate to="/unavailable" state={{ from: location }} replace />;
  }

  return (
    <Fragment>
      {userQuery.status === "loading" ? <AxonLoader /> : <Notes />}{" "}
    </Fragment>
  );
};

export default PersistAuth;
