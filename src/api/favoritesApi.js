import { getLocalStorage } from "../utils/index";
import axiosClient from "./axiosClient";

const favoritesApi = {
  toggleFavoriteReview(body) {
    const url = "/favorites/toggleFavoriteReview";
    return axiosClient.post(url, body);
  },
  toggleFavoriteComment(body) {
    const url = "/favorites/toggleFavoriteComment";
    return axiosClient.post(url, body);
  },
  getAmountFavoriteReview(reviewId) {
    const url = `/favorites/getAmountFavoriteReview/${reviewId}`;
    return axiosClient.get(url);
  },
  getAmountFavoriteComment(commentId) {
    const url = `/favorites/getAmountFavoriteComment/${commentId}`;
    return axiosClient.get(url);
  },
};

export default favoritesApi;
