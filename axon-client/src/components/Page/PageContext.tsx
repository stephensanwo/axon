import { createContext, useContext } from "react";
import { PageContextProps } from "./index.types";

const PageContext = createContext({} as PageContextProps);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("Page.* must be used within a Page");
  }
  return context;
};

export default PageContext;
