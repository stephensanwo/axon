import { useContext } from "react";
import AppContext from "src/context/app";

export const useAppContext = () => useContext(AppContext);
