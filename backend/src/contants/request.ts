import e, { Request } from "express";

export interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface LogginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface RefreshTokenRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}

export interface ForgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}

export interface VerifyEmailRequest extends Request {
  body: {
    email: string;
  };
}

export interface VerifyOTPEmailRequest extends Request {
  body: {
    email: string;
    otp: string;
  };
}

export interface ChangePasswordRequest extends Request {
  body: {
    email: string;
    newPassword: string;
  };
}
