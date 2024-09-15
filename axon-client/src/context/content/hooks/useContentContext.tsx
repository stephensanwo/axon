import { useContext } from "react";
import { ContentContext } from "..";

export function useContentContext() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
}
