import { getLocalStorage } from "../utils/index";
import axiosClient from "./axiosClient";

const blogsApi = {
  getAll(params) {
    const url = "/products";
    return axiosClient.get(url, {
      params,
    });
  },
  getCount(count) {
    const url = `/products/count/${count}`;
    return axiosClient.get(url);
  },
  getCountReviewProduct(product) {},
};

export default blogsApi;
