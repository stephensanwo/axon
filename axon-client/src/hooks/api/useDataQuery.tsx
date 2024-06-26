import { UseQueryResult, useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch data from the server
 * @param queryKey - The key to identify the query
 * @param queryFn - The function to fetch the data
 * @param staleTime - The time in milliseconds to consider the data fresh
 * @param refetchOnMount - Whether to refetch the data when the component mounts
 * @param refetchOnWindowFocus - Whether to refetch the data when the window regains focus
 * @param refetchOnReconnect - Whether to refetch the data when the network reconnects
 * @returns The query result
 * @example
 * ```tsx
 * const query = useDataQuery(
 *  ["myQuery"],
 * async () => {
 *   const response = await fetch("/api/data");
 *  return response.json();
 * }
 * );
 * ```
 * @category Hooks
 * @module useDataQuery
 */
export function useDataQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  staleTime = 5 * 1000,
  refetchOnMount = false,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false
): UseQueryResult<T, unknown> {
  const query = useQuery<T>({
    queryKey: [...queryKey],
    queryFn: () => queryFn(),
    staleTime: staleTime,
    refetchOnMount: refetchOnMount,
    refetchOnWindowFocus: refetchOnWindowFocus,
    refetchOnReconnect: refetchOnReconnect,
  });
  return query;
}
