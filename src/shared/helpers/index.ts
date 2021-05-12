import axios, { AxiosInstance } from "axios";
import { v4 as uuidV4 } from "uuid";

export const getClientApi = (uri: string): AxiosInstance => {
  return axios.create({
    baseURL: uri,
  });
};

export const generateId = (): string => {
  return uuidV4();
};
