import { axiosPrivate } from "../axios";

export const GET_AUTH_USER = async () => {
  const response = await axiosPrivate.get("/auth-user");
  return response.data;
};
