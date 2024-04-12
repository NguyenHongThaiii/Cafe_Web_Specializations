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
  forgotPasswords(data) {
    const url = "/auth/forgotPassword";
    return axiosClient.post(url, data);
  },
  validateResetPassword(data) {
    const url = "/auth/validateReset";
    return axiosClient.post(url, data);
  },
  getBySlug(slug) {
    const url = `/auth/users/profile/${slug}`;
    return axiosClient.get(url);
  },
  handleResetPassword(data) {
    const url = "/auth/resetPassword";
    return axiosClient.post(url, data);
  },
  getAll(params) {
    const url = `/auth/users`;
    return axiosClient.get(url, { params });
  },
  uploadAvatar(slug, body) {
    const url = `/auth/avatar/${slug}`;
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default usersApi;
