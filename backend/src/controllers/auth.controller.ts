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
import validateService from "@/services/validate.service";

const { generateToken } = jwtUtils;
const { createNewAccessToken } = authService;
const { compareEmailAndPassword } = validateService;
const { createUser, sameEmail, existsEmail } = userService;

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

      await sameEmail(email);
      await createUser(email, password);

      res.status(HTTP_STATUS_CODE.CREATED).json({
        message:
          "Đăng ký thành công, vui lòng nhập mã OTP để xác nhận tài khoản",
      });

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

      const { email, password } = req.body;

      const userId: string = await compareEmailAndPassword(email, password);

      if (!userId) {
        throw new APIError(
          "UNAUTHORIZED",
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Đăng nhập không thành công",
        );
      }

      const accessToken = generateToken(
        userId,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.EXISTS_ACCESS_TOKEN,
      );
      const refreshToken = generateToken(
        userId,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.EXISTS_REFRESH_TOKEN,
      );

      if (accessToken && refreshToken) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });

        res.status(HTTP_STATUS_CODE.OK).json({
          message: "Đăng nhập thành công",
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

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(HTTP_STATUS_CODE.OK).json({ message: "Refesh token" });
    } catch (error) {
      next(error);
    }
  },
  logout: async (_: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
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

      const { email } = req.body;

      await existsEmail(email);

      res
        .status(HTTP_STATUS_CODE.OK)
        .json({ message: "Vui lòng xác nhận OTP để tiếp tục" });
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
