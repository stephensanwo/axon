import { useContext } from "react";
import { axiosPrivate } from "../api/axios";
import AppContext from "../context/app";

const useQueryAuth = () => {
  const { setUser, setIsSignedIn } = useContext(AppContext);

  const queryAuth = async () => {
    const response = await axiosPrivate("/auth-user");
    setUser(response.data);
    setIsSignedIn(true);
    return response.data;
  };
  return queryAuth;
};

export default useQueryAuth;
