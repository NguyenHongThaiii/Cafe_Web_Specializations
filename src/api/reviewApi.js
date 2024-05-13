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
  createReview(body) {
    const url = "/reviews";
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteReview(id) {
    const url = `/reviews/id/${id}`;
    return axiosClient.delete(url);
  },
};

export default reviewsApi;
