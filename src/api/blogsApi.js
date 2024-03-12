import { getLocalStorage } from "../utils/index";
import axiosClient from "./axiosClient";

const blogsApi = {
  getAll(params) {
    const url = "/products";
    return axiosClient.get(url, {
      params,
    });
  },
};

export default blogsApi;
