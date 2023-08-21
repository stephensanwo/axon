import { useContext } from "react";
import { axiosPrivate } from "src/api/axios";
import AuthContext from "src/context/auth";

const useQueryAuth = () => {
  const { setUser, setIsSignedIn } = useContext(AuthContext);

  const queryAuth = async () => {
    const response = await axiosPrivate("/auth-user");
    setUser(response.data);
    setIsSignedIn(true);
    return response.data;
  };
  return queryAuth;
};

export default useQueryAuth;
