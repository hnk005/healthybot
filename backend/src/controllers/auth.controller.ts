import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import {
  ForgotPasswordRequest,
  LogginRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from "@/contants/request";
import jwtUtils from "@/utils/jwt.util";
import { User } from "@/models";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const { generateAccessToken, generateRefreshToken, verifyRefreshToken } =
  jwtUtils;

const authController = {
  register: async (req: RegisterRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
        );
      }

      const extUser = await User.findOne({ email });

      if (extUser) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Email đã tồn tại",
        );
      }

      const newUser = new User({
        email,
        password,
      });

      await newUser.save();

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
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Email không tồn tại",
        );
      }

      if (!user.isVerified) {
        throw new APIError(
          "UNAUTHORIZED",
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Tài khoản chưa được xác nhận",
        );
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Mật khẩu không chính xác",
        );
      }

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
          data: { user, token: accessToken },
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
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Chưa đăng nhập",
        );
      }

      const decode = verifyRefreshToken(refreshToken);

      if (!decode.userId) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Token không hợp lệ hoặc đã hết hạn",
        );
      }

      const newAccessToken = generateAccessToken(decode.userId);
      res.status(HTTP_STATUS_CODE.OK).json({ token: newAccessToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Yêu cầu không hợp lệ",
        );
      }

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
  forgotPassword: async (
    req: ForgotPasswordRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email, isVerified: true });

      if (!user) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Email không tồn tại hoặc chưa được xác nhận",
        );
      }

      res.status(HTTP_STATUS_CODE.OK).json();
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
