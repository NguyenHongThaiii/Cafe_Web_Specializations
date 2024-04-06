import axiosClient from "./axiosClient";

const reviewsApi = {
  getAll(params) {
    const url = "/reviews";
    return axiosClient.get(url, {
      params,
    });
  },
  getCountReviewByProduct(params) {
    const url = "/reviews";
    return axiosClient.get(url, {
      params,
    });
  },
};

export default reviewsApi;
