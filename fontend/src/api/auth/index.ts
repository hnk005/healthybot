import { API_AUTH, API_URL } from "@/core/enum";
import axios from "axios";

const AUTH = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

export const register = (email: string, password: string) => {
  return AUTH.post(API_AUTH.REGISTER, { email, password });
};

export const login = (email: string, password: string) => {
  return AUTH.post(API_AUTH.LOGIN, { email, password });
};

export const logout = () => {
  return AUTH.delete(API_AUTH.LOGOUT);
};

export const refreshToken = () => {
  return AUTH.post(API_AUTH.REFRESH_TOKEN);
};

export const forgotPassword = (email: string) => {
  return AUTH.post(API_AUTH.FORGOT_PASSWORD, { email });
};

AUTH.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await logout();
    }
    return Promise.reject(error);
  },
);
