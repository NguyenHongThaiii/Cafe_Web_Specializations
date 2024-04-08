import axiosClient from "./axiosClient";

const blogSavedApi = {
  getAll(params) {
    const url = `/productSaved`;
    return axiosClient.get(url, { params });
  },
  toggleBlogSaved(body) {
    const url = "/productSaved/toggle";
    return axiosClient.post(url, body);
  },
  checkBlogIsSavedByUserId(params) {
    const url = `/productSaved/userId/${params.userId}/productId/${params.productId}`;
    return axiosClient.get(url);
  },
};

export default blogSavedApi;
