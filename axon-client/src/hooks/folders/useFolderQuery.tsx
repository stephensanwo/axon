import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchData } from "src/api/query";
import { IFolderList } from "src/types/folders";

export const useFolderQuery = (): {
  folderData: IFolderList[] | null;
  folderQuery: UseQueryResult<IFolderList[], unknown>;
} => {
  const query = useQuery<IFolderList[]>({
    queryKey: ["folder-list"],
    queryFn: () => fetchData("folder-list"),
  });

  return {
    folderData: query.data ?? null,
    folderQuery: query,
  };
};
