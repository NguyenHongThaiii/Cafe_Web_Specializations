import axiosClient from "./axiosClient";

const purposesApi = {
  getAll(params) {
    const url = "/purposes";
    return axiosClient.get(url, { params });
  },
};

export default purposesApi;
