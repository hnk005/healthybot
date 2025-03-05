import { HTTP_STATUS_CODE } from "@/contants/enum";
import {
  ChangePasswordRequest,
  VerifyOTPEmailRequest,
} from "@/contants/request";
import { User } from "@/models";
import { NextFunction, Request, Response } from "express";

const usersController = {
  updateEmailVerify: async (
    req: VerifyOTPEmailRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;

    try {
      await User.findOneAndUpdate({ email }, { isVerified: true });

      res
        .status(HTTP_STATUS_CODE.OK)
        .json({ message: "Xác nhân email thành công, Bạn có thể đăng nhập" });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (
    req: ChangePasswordRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });
      user?.updateOne({ password: newPassword });
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {},
};

export default usersController;
