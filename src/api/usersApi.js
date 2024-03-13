import axiosClient from "./axiosClient";

const usersApi = {
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  signup(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/auth/logout";
    return axiosClient.get(url);
  },
};

export default usersApi;
