import { createContext, useEffect, useState } from "react";
import { IUser } from "src/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
