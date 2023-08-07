import axios from "axios";

export default axios.create({
  baseURL: "https://127.0.0.1:8101",
});

export const axiosPrivate = axios.create({
  baseURL: "https://127.0.0.1:8101",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
