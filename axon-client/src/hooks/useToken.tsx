import axios from "../api/axios";
import useAuth from "./useAuth";

const useToken = () => {
  const { setAuth } = useAuth();

  const token = async () => {
    const response = await axios.get("/token", {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
  };
  return token;
};

export default useToken;
