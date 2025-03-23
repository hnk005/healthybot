export const API_URL = "http://localhost:4000/api";

export enum API_AUTH {
  LOGIN = "/login",
  REGISTER = "/register",
  LOGOUT = "/logout",
  REFRESH_TOKEN = "/refresh-token",
  FORGOT_PASSWORD = "/forgot-password",
}

export enum API_USER {
  INFO = `/info`,
  UPDATE_VERIFY = `/update/verify`,
  UPDATE_PASSWORD = `/update/password`,
}

export enum API_VALIDATION {
  VERIFY_EMAIL = `/verify-email`,
  FORGOT_PASSWORD = `/forgot-password`,
}

export enum API_SEND {
  VERIFY_EMAIL = `/verify-email`,
  FORGOT_PASSWORD = `/forgot-password`,
}
