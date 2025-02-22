import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "~/contants/interface";
import { HTTP_STATUS } from "~/contants/httpStatus";

dotenv.config();

// xác thực người dùng
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Token không hợp lệ" });
  }
};

// kiểm tra quyền Admin
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Bạn không có quyền" });
  }
  next();
};
