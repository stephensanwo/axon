import { axiosPrivate } from "./axios";

// Function to send POST request and update data
export const postData = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response = await axiosPrivate.post(endpoint, data);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to send POST request to the ${endpoint} API.`);
  }
};

// Function to send DELETE request and update data
export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosPrivate.delete(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to send DELETE request to the ${endpoint} API.`);
  }
};

// Function to send PATCH request and update data
export const patchData = async <T>(
  endpoint: string,
  partialData: Partial<T>
): Promise<T> => {
  try {
    const response = await axiosPrivate.patch(endpoint, partialData);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to send PATCH request to the ${endpoint} API.`);
  }
};
