import { NextFunction, Response } from "express";
import { VerifyOTPEmailRequest } from "@/contants/request";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import databaseService from "@/services/database.service";

const { getOTPEmail, deleteOTPEmail } = databaseService;

const verifyOTP = async (name: string, email: string, otp: string) => {
  const storedOTP = await getOTPEmail(name, email);

  if (storedOTP !== otp) {
    throw new APIError(
      "UNAUTHORIZED",
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "OTP xác nhận hết hạn hoặc không đúng",
    );
  }

  await deleteOTPEmail(name, email);
};

const verifyController = {
  verifyEmail: async (
    req: VerifyOTPEmailRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, otp } = req.body;

      
      res.status(HTTP_STATUS_CODE.OK).json()
    } catch (error) {
      next(error);
    }
  },
};

export default verifyController;