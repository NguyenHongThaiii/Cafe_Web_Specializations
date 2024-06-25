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
  existsByReviewIdAndUserId(reviewId, userId) {
    const url = `/favorites/exists/review/${reviewId}/user/${userId}`;
    return axiosClient.get(url);
  },
  existsByCommentIdAndUserId(commentId, userId) {
    const url = `/favorites/exists/comment/${commentId}/user/${userId}`;
    return axiosClient.get(url);
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
