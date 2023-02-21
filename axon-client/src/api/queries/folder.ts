import { CreateFolderProps } from "types/folders";
import { axiosPrivate } from "../axios";

export const GET_FOLDER_LIST = async () => {
  const response = await axiosPrivate.get("/folder-list");
  return response.data;
};

export const CREATE_NEW_FOLDER = async (folder: CreateFolderProps) => {
  const response = await axiosPrivate.post("/folder", folder);
  return response;
};
