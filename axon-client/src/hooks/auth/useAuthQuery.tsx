import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchUser } from "src/api/query";
import { IUser } from "src/types/user";

export const useAuthQuery = (): {
  userData: IUser | null;
  userQuery: UseQueryResult<IUser, unknown>;
} => {
  const query = useQuery<IUser>({
    queryKey: ["auth-user"],
    queryFn: () => fetchUser("auth-user"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return {
    userData: query.data ?? null,
    userQuery: query,
  };
};
