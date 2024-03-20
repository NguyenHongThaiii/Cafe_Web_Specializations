import axiosClient from "./axiosClient";

const reviewsApi = {
  getCountReviewByProduct(params) {
    const url = "/reviews";
    return axiosClient.get(url, {
      params,
    });
  },
};

export default reviewsApi;
