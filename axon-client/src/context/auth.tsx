import { UseQueryResult } from "@tanstack/react-query";
import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { useAuthQuery } from "src/hooks/auth/useAuthQuery";
import { IUser } from "src/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: React.MutableRefObject<IUser | null>;
  userQuery: UseQueryResult<IUser, unknown>;
  getUser: () => IUser | null;
}
// console.log("AuthContext.tsx");

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userData, userQuery } = useAuthQuery();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const user = useRef<IUser | null>(null);

  const getUser = useCallback(() => {
    if (userData) {
      setIsSignedIn(true);
    }
    return userData;
  }, [userData]);

  user.current = useMemo(() => getUser(), [getUser]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        user,
        userQuery,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
