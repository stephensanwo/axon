import { useQuery } from "@tanstack/react-query";
import { fetchData } from "src/api/query";
import { IFolderList } from "src/types/folders";

export const useFolderQuery = (): {
  folderData: IFolderList[] | null;
  folderError: unknown;
  folderStatus: "error" | "success" | "loading";
  folderFetching: boolean;
} => {
  const query = useQuery<IFolderList[]>({
    queryKey: ["folder-list"],
    queryFn: () => fetchData("folder-list"),
  });
  const { status, data, error, isFetching } = query;

  return {
    folderData: data ?? null,
    folderError: error,
    folderStatus: status,
    folderFetching: isFetching,
  };
};
