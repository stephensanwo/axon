import { deleteData, patchData, postData } from "src/api/mutate";
import useSWR, { mutate } from "swr";

const useDataMutation = <T,>(
  queryKey: string,
  maxRetries: number = 3,
  retryInterval: number = 5000
) => {
  const { data, error, isLoading } = useSWR(queryKey, null);

  const mutateData = async (newData: T, retries: number = maxRetries) => {
    try {
      // Optimistically update the UI
      mutate(queryKey, newData, false);

      // Send the POST request
      const response = await postData(queryKey, newData);

      // Update the data after a successful request
      mutate(queryKey, response);
    } catch (error) {
      if (retries > 0) {
        // Retry the mutation after a delay
        setTimeout(() => mutateData(newData, retries - 1), retryInterval);
      } else {
        // Handle error when retries are exhausted
        console.error("Error sending POST request:", error);
        mutate(queryKey); // Reset the optimistic update
      }
    }
  };

  return {
    loading: isLoading,
    error,
    mutate: mutateData,
    data: data,
  };
};

const useDataUpdate = <T,>(
  queryKey: string,
  maxRetries: number = 3,
  retryInterval: number = 5000
) => {
  const { data, error, isLoading } = useSWR(queryKey, null);

  const updateData = async (
    newData: Partial<T>,
    retries: number = maxRetries
  ) => {
    try {
      // Optimistically update the UI
      mutate(queryKey, { ...data, ...newData }, false);

      // Send the PATCH request
      const response = await patchData(queryKey, newData);

      // Update the data after a successful update
      mutate(queryKey, response);
    } catch (error) {
      if (retries > 0) {
        // Retry the update after a delay
        setTimeout(() => updateData(newData, retries - 1), retryInterval);
      } else {
        // Handle error when retries are exhausted
        console.error("Error sending PATCH request:", error);
        mutate(queryKey); // Reset the optimistic update
      }
    }
  };

  return {
    loading: isLoading,
    error,
    update: updateData,
    data,
  };
};

const useDataDeletion = <T,>(
  queryKey: string,
  maxRetries: number = 3,
  retryInterval: number = 5000
) => {
  const { data, error, isLoading } = useSWR(queryKey, null);

  const mutateData = async (retries: number = maxRetries) => {
    try {
      // Optimistically update the UI
      mutate(queryKey, null, false);

      // Send the DELETE request
      await deleteData(queryKey);

      // Update the data after a successful deletion
      mutate(queryKey, null);
    } catch (error) {
      if (retries > 0) {
        // Retry the deletion after a delay
        setTimeout(() => mutateData(retries - 1), retryInterval);
      } else {
        // Handle error when retries are exhausted
        console.error("Error sending DELETE request:", error);
        mutate(queryKey); // Reset the optimistic update
      }
    }
  };

  return {
    loading: isLoading,
    error,
    delete: mutateData,
    data,
  };
};

export { useDataMutation, useDataDeletion, useDataUpdate };
