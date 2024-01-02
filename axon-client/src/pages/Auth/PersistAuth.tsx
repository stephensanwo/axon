import { Fragment, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AxonLoader from "src/components/Loader/Loader";
import AuthContext from "src/context/auth";
import Notes from "../Notes";

const PersistAuth = () => {
  const { user, userQuery } = useContext(AuthContext);
  console.log("Persist Auth", user);
  const location = useLocation();

  if (userQuery.status === "error") {
    return <Navigate to="/unavailable" state={{ from: location }} replace />;
  }
  if (user.current?.subscription.plan === "INACTIVE") {
    // return (
    //   <Navigate
    //     to="/billing"
    //     state={{ from: location, prefilled_email: user.current?.email }}
    //     replace
    //   />
    // );
  }
  return (
    <Fragment>
      {userQuery.status === "loading" ? <AxonLoader /> : <Notes />}
    </Fragment>
  );
};

export default PersistAuth;
