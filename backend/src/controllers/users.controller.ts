import { HTTP_STATUS_CODE, TASK } from "@/contants/enum";
import { ChangePasswordRequest } from "@/contants/request";
import userService from "@/services/user.service";
import { APIError } from "@/utils/error";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const { compareUserId, changePassword } = userService;

const usersController = {
  updateEmailVerify: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.cookies[TASK.verifyEmail] ?? "";

      await compareUserId(userId);

      res.clearCookie(TASK.verifyEmail);
      res
        .status(HTTP_STATUS_CODE.OK)
        .json({ message: "Xác nhân email thành công, Bạn có thể đăng nhập" });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (
    req: ChangePasswordRequest,
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

      const userId: string = req.cookies[TASK.forgotPassword] ?? "";
      const { newPassword } = req.body;

      await changePassword(userId, newPassword);

      res.clearCookie(TASK.forgotPassword);
      res
        .status(HTTP_STATUS_CODE.OK)
        .json({ message: "Thay đổi mật khẩu thành công" });
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
