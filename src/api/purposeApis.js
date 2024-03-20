import axiosClient from "./axiosClient";

const purposeApis = {
  getAll(params) {
    const url = "/purposes";
    return axiosClient.get(url, { params });
  },
};

export default purposeApis;
