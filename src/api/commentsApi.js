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
  createComment(data) {
    const url = "/comments";
    return axiosClient.post(url, data);
  },
  deleteComment(data) {
    const url = "/comments";
    return axiosClient.delete(url, { data });
  },
};

export default commentsApi;
