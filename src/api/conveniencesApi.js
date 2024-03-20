import axiosClient from "./axiosClient";

const conveniencesApi = {
  getAll(params) {
    const url = "/conveniences";
    return axiosClient.get(url, { params });
  },
};

export default conveniencesApi;
