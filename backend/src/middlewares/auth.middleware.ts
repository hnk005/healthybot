import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { HTTP_STATUS } from '@/contants/httpStatus';
import jwtService from '@/services/jwt.service';

dotenv.config();

const { verifyAccessToken } = jwtService;

const authMiddleware = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Chưa đăng nhập' });
      return;
    }

    try {
      const decoded = verifyAccessToken(token);
      if (decoded.userId) {
        next();
      }
    } catch {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: 'Token không hợp lệ' });
      return;
    }
  },
};
// xác thực người dùng
export default authMiddleware;
