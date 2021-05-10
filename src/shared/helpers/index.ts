import axios, { AxiosInstance } from "axios";

export const getClientApi = (uri: string): AxiosInstance => {
  return axios.create({
    baseURL: uri,
  });
};
