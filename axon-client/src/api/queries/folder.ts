import { ICreateFolder, IPatchFolder } from "src/types/folders";
import { axiosPrivate } from "../axios";

export const GET_FOLDER_LIST = async () => {
  const response = await axiosPrivate.get("/folder-list");
  return response.data;
};

export const CREATE_NEW_FOLDER = async (folder: ICreateFolder) => {
  const response = await axiosPrivate.post("/folder", folder);
  return response;
};

export const EDIT_NEW_FOLDER = async (
  folder: IPatchFolder,
  folder_id: string
) => {
  const response = await axiosPrivate.patch(
    `/folder?folder_id=${folder_id}`,
    folder
  );
  return response;
};

export const DELETE_FOLDER = async (folder_id: string) => {
  const response = await axiosPrivate.delete(`/folder?folder_id=${folder_id}`);
  return response;
};
