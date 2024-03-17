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
  validateRegistration(data) {
    const url = "/auth/validateRegister";
    return axiosClient.post(url, data);
  },
};

export default usersApi;
