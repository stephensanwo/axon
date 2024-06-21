import { createContext, useContext } from "react";
import { IHeaderContextProps } from "./index.types";

const HeaderContext = createContext({} as IHeaderContextProps);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("Header.* must be used within a Header");
  }
  return context;
};

export default HeaderContext;
