export const API_URL = "https://server1.loca.lt/v1/api";

export enum API_AUTH {
  LOGIN = "/login",
  REGISTER = "/register",
  LOGOUT = "/logout",
  REFRESH_TOKEN = "/refresh-token",
  FORGOT_PASSWORD = "/forgot-password",
}

export enum API_USER {
  IS_USER = "/info",
  UPDATE_VERIFY = "/update/verify",
  UPDATE_PASSWORD = "/update/password",
}

export enum API_VALIDATION {
  VERIFY_EMAIL = "/verify-email",
  FORGOT_PASSWORD = "/forgot-password",
}

export enum API_SEND {
  VERIFY_EMAIL = "/verify-email",
  FORGOT_PASSWORD = "/forgot-password",
}

export enum API_CHAT {
  GET_HISTORY = "/get",
  GET_MESSAGE = "/get/messages",
  CREATED = "/create",
  CREATED_SECTION = "/create/section",
  UPDATE_TITLE = "/update/title",
  DELETE_CHAT = "/delete",
}
