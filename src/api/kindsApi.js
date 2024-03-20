import axiosClient from "./axiosClient";

const kindsApi = {
  getAll(params) {
    const url = "/kinds";
    return axiosClient.get(url, { params });
  },
};

export default kindsApi;
