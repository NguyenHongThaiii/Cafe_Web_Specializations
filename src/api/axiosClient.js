import axios from "axios";
import { STORAGE_KEY } from "../constant/index";
import { getLocalStorage, removeLocalStorage } from "../utils/index";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.13:8080/api/v1",
  headers: { "Content-type": "application/json" },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getLocalStorage(STORAGE_KEY.TOKEN);
    console.log("token ", token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const message = error?.response?.data?.message;
    if (
      error.code === "ERR_BAD_REQUEST" &&
      error?.response?.data?.error?.statusCode === 401 &&
      message !== "Token is invalid or has expired"
    ) {
      throw new Error(message);
    }
    if (
      error.code === "ERR_BAD_REQUEST" &&
      error?.response?.data?.error?.statusCode === 401 &&
      message === "Token is invalid or has expired"
    ) {
      removeLocalStorage(STORAGE_KEY.USER);
      throw new Error(message);
    }
    if (message) error.message = message;
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
