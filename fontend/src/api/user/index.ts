import axios from "axios";
import { API_URL, API_USER } from "@/core/enum";
import { refreshToken } from "../auth";

const USER = axios.create({
  baseURL: `${API_URL}/user`,
  withCredentials: true,
});

export const userInfo = () => {
  return USER.get(API_USER.IS_USER);
};

export const updateVerify = () => {
  return USER.put(API_USER.UPDATE_VERIFY);
};

export const updatePassword = (newPassword: string) => {
  return USER.put(API_USER.UPDATE_PASSWORD, { newPassword });
};

USER.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return USER(originalRequest);
    }
    return Promise.reject(error);
  },
);
