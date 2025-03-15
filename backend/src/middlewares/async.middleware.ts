import { RegisterRequest } from "@/contants/request";
import databaseService from "@/services/database.service";
import * as sendWorker from "@/worker/send.worker";
import { NextFunction, Response } from "express";

const { verifyEmail, forgotPassword } = sendWorker;
const { saveRedis } = databaseService;

const asyncMiddleware = {
  sendOTPVerifyEmail: async (
    req: RegisterRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;

      const timeExisOTP = 5 * 60; //thời gian tồn tại của mã OTP là 5 phút
      const otp: string = await verifyEmail.sendOTPEmail({ email });
      const key = `${verifyEmail.name}:${email}`;
      await saveRedis(key, otp, timeExisOTP);
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

      const timeExisOTP = 5 * 60; //thời gian tồn tại của mã OTP là 5 phút
      const otp: string = await forgotPassword.sendOTPEmail({ email });
      const key = `${forgotPassword.name}:${email}`;
      await saveRedis(key, otp, timeExisOTP);
    } catch (err) {
      next(err);
    }
  },
};

export default asyncMiddleware;
