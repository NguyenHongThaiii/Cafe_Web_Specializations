import axiosClient from "./axiosClient";

const commentApis = {
  getAll(params) {
    const url = "/comments";
    return axiosClient.get(url, {
      params,
    });
  },
  getById(id) {
    const url = `/comments/id/${id}`;
    return axiosClient.get(url, {});
  },
};

export default commentApis;
