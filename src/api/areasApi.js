import axiosClient from "./axiosClient";

const areasApi = {
  getAll(params) {
    const url = "/areas";
    return axiosClient.get(url, { params });
  },
};

export default areasApi;
