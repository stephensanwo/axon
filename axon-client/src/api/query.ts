import { axiosAuthPrivate, axiosPrivate } from "./axios";

// Function to fetch data from API
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosPrivate.get(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint} API.`);
  }
};

// Function to fetch data from API
export const fetchUser = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosAuthPrivate.get(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to fetch data from the ${endpoint} API.`);
  }
};
