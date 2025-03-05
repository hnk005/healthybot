import { HTTP_STATUS_CODE } from "@/contants/enum";
import { RegisterRequest } from "@/contants/request";
import databaseService from "@/services/database.service";
import * as sendWorker from "@/worker/send.worker";
import { NextFunction, Response } from "express";

const { verifyEmail, forgotPassword } = sendWorker;
const { saveOTPEmail } = databaseService;

const asyncMiddleware = {
  sendOTPVerifyEmail: async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;

      const { name, sendOTPEmail } = verifyEmail;

      const timeExisOTP = 5 * 60; //thời gian tồn tại của mã OTP
      const otp: string = await sendOTPEmail({ email });
      await saveOTPEmail(name, email, otp, timeExisOTP);
    } catch (err) {
      next(err);
    }
  },
  sendOTPForgotPassword: async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;

      const { name, sendOTPEmail } = forgotPassword;

      const timeExisOTP = 5 * 60; //thời gian tồn tại của mã OTP
      const otp: string = await sendOTPEmail({ email });
      await saveOTPEmail(name, email, otp, timeExisOTP);
    } catch (err) {
      next(err);
    }
  },
};

export default asyncMiddleware;
