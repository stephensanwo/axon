import { createContext, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  auth: {
    access_token: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({
    access_token: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
