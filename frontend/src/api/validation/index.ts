import { API_URL, API_VALIDATION } from "@/core/enum";
import axios from "axios";

const VALIDATION = axios.create({
  baseURL: `${API_URL}/validation`,
  withCredentials: true,
});

export const verifyEmail = (email: string, otp: string) => {
  return VALIDATION.post(API_VALIDATION.VERIFY_EMAIL, { email, otp });
};

export const verifyForgotPassword = (email: string, otp: string) => {
  return VALIDATION.post(API_VALIDATION.FORGOT_PASSWORD, { email, otp });
};
