import axiosClient from "./axiosClient";

const commentsApi = {
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

export default commentsApi;
