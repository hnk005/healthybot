import { API_SEND, API_URL } from "@/core/enum";
import axios from "axios";

const SEND = axios.create({
  baseURL: `${API_URL}/send`,
  withCredentials: true,
});

export const sendOtpVerifyEmail = (email: string) => {
  return SEND.post(API_SEND.VERIFY_EMAIL, { email });
};

export const sendOtpForgotPassword = (email: string) => {
  return SEND.post(API_SEND.FORGOT_PASSWORD, { email });
};
