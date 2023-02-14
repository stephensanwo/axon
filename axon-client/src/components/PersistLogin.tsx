import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();
  const { auth } = useAuth();

  useEffect(() => {
    const getToken = async () => {
      try {
        await token();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.access_token ? getToken() : setIsLoading(false);
  }, [auth, token]);
};

export default PersistLogin;
