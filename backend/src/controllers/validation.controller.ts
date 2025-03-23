import { NextFunction, Response } from "express";
import { ValidateRequest } from "@/contants/request";
import { HTTP_STATUS_CODE, TASK } from "@/contants/enum";
import databaseService from "@/services/database.service";
import validateService from "@/services/validate.service";
import { validationResult } from "express-validator";
import { APIError } from "@/utils/error";

const { saveRedis } = databaseService;
const { compareOtp } = validateService;

const validateController = {
  verifyEmail: async (
    req: ValidateRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
          result.array(),
        );
      }

      const { email, otp } = req.body;

      const { user, task } = await compareOtp(TASK.verifyEmail, email, otp);

      const timeExis = 2 * 60; //tồn tại 15 phút

      await saveRedis(task, user.id, timeExis);

      res.cookie(task, user.id, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.status(HTTP_STATUS_CODE.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (
    req: ValidateRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
          result.array(),
        );
      }

      const { email, otp } = req.body;

      const { user, task } = await compareOtp(TASK.forgotPassword, email, otp);

      const timeExis = 15 * 60; //tồn tại 15 phút

      await saveRedis(task, user.id, timeExis);

      res.cookie(task, user.id, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res
        .status(HTTP_STATUS_CODE.OK)
        .json({ message: "Xác nhận OTP thành công" });
    } catch (error) {
      next(error);
    }
  },
};

export default validateController;
