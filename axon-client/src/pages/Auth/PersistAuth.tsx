import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useQueryAuth from "../../hooks/useQueryAuth";
import AppContext from "../../context/app";
import AxonLoader from "components/Loader/Loader";

const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const queryAuth = useQueryAuth();
  const { user } = useContext(AppContext);

  useEffect(() => {
    const runQueryAuth = async () => {
      try {
        await queryAuth();
      } catch (err: any) {
        console.log(err?.response);
      } finally {
        setIsLoading(false);
      }
    };
    !user ? runQueryAuth() : setIsLoading(false);
  }, [user, queryAuth]);

  return <Fragment>{isLoading ? <AxonLoader /> : <Outlet />} </Fragment>;
};

export default PersistAuth;
