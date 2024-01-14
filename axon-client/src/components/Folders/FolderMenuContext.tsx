import { createContext, useContext } from "react";
import { IFolderMenuContextProps } from "./index.types";

const FolderMenuContext = createContext({} as IFolderMenuContextProps);

export const useFolderMenuContext = () => {
  const context = useContext(FolderMenuContext);
  if (!context) {
    throw new Error("FolderMenu.* must be used within a FolderMenu");
  }
  return context;
};

export default FolderMenuContext;
