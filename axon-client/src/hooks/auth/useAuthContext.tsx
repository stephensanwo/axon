import { useContext } from "react";
import AuthContext from "src/context/auth";

export function useAuthContext() {
  return useContext(AuthContext);
}
