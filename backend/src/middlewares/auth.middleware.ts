import { Response, NextFunction } from "express";
import jwtService from "@/utils/jwt.util";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import { AuthUserRequest } from "@/contants/request";

const { verifyToken } = jwtService;

const authMiddleware = {
  verifyToken: async (
    req: AuthUserRequest,
    _: Response,
    next: NextFunction,
  ) => {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Chưa đăng nhập",
        );
      }

      const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) {
        throw new APIError(
          "UNAUTHORIZED",
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Token không hợp lệ hoặc hết hạn",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authMiddleware;
