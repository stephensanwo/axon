import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8100",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8100",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
