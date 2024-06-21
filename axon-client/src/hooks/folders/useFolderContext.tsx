import { useContext } from "react";
import FolderContext from "src/context/folder";

export function useFolderContext() {
  return useContext(FolderContext);
}
