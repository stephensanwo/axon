import useSWR from "swr";

const useDataFetching = <T,>(
  queryKey: string,
  fetchDataFn: () => Promise<T>
) => {
  const { data, error, isLoading } = useSWR(queryKey, fetchDataFn, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 3) return; // Retry up to 3 times
      setTimeout(() => revalidate({ retryCount }), 5000); // Retry after 5 seconds
    },
  });

  const isSuccess = !isLoading && !error;

  return {
    loading: isLoading,
    success: isSuccess,
    error,
    data: data as T | null,
  };
};

export { useDataFetching };
