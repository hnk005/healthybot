import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import jwtService from "@/utils/jwt.util";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import { User } from "@/models";
import { ForgotPasswordRequest, RegisterRequest } from "@/contants/request";

dotenv.config();

const { verifyAccessToken } = jwtService;

const authMiddleware = {
  verifyToken: async (req: Request, _: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Chưa đăng nhập",
        );
      }

      const decoded = verifyAccessToken(token);
      if (!decoded.userId) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Token không hợp lệ",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authMiddleware;
