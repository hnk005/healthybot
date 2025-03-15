import { NextFunction, Request, Response } from "express";
import {
  LogginRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from "@/contants/request";
import jwtUtils from "@/utils/jwt.util";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import { validationResult } from "express-validator";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";

const { generateAccessToken, generateRefreshToken } = jwtUtils;
const { createNewAccessToken } = authService;
const { createUser } = userService;

const authController = {
  register: async (req: RegisterRequest, res: Response, next: NextFunction) => {
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

      const { email, password } = req.body;

      await createUser(email, password);

      res
        .status(HTTP_STATUS_CODE.CREATED)
        .json({ message: "Đăng ký thành công" });

      next();
    } catch (error) {
      next(error);
    }
  },
  login: async (req: LogginRequest, res: Response, next: NextFunction) => {
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

      const { user } = req.body;

      if (!user) throw new APIError();

      const accessToken = generateAccessToken(user._id as string);
      const refreshToken = generateRefreshToken(user._id as string);

      if (accessToken && refreshToken) {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: true,
        });
        res.status(HTTP_STATUS_CODE.OK).json({
          message: "Đăng nhập thành công",
          data: { token: accessToken },
        });
        return;
      }

      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Đăng nhập không thành công",
      );
    } catch (error) {
      next(error);
    }
  },

  refresh: async (
    req: RefreshTokenRequest,
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

      const refreshToken = req.cookies.refreshToken;

      const newAccessToken = await createNewAccessToken(refreshToken);

      res.status(HTTP_STATUS_CODE.OK).json({ token: newAccessToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(HTTP_STATUS_CODE.OK).json({ message: "Đăng xuất thành công" });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
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

      res.status(HTTP_STATUS_CODE.OK).json();
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
