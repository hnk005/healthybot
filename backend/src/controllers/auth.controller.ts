import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { HTTP_STATUS } from "@/contants/httpStatus";
import { RegisterRequest } from "@/contants/request";
import jwtService from "@/services/jwt.service";
import User from "@/models/database/User";
import databaseService from "@/services/database.service";

dotenv.config();

const {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} = jwtService;

const { getVerifyEmail, deleteVerifyEmail } = databaseService;

const authController = {
    register: async (req: RegisterRequest, res: Response, next: NextFunction) => {
        try {
            const { email, avatar, password, name, isValid } = req.body;

            if (!email || !password || !name) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Yêu cầu không hợp lệ" });
                return;
            }

            const extUser = await User.findOne({ email });

            if (extUser) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email đã tồn tại" })
                return;
            }

            const newUser = new User({ email, avatar, password, name, isVerified: isValid });

            await newUser.save();

            res.status(HTTP_STATUS.CREATED).json({ message: "Đăng ký thành công" });

            next();
        } catch (error) {
            next(error)
        }

    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Email không tồn tại" });
                return;
            }

            if (!user.isVerified) {
                res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Tài khoản chưa được xác nhận!" });
                return;
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Mật khẩu không chính xác" });
                return;
            }

            const accessToken = generateAccessToken(user._id as string);
            const refreshToken = generateRefreshToken(user._id as string);

            if (accessToken && refreshToken) {

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: true,
                })
                res.status(HTTP_STATUS.OK).json({ message: "Đăng nhập thành công", data: { user, token: accessToken } });
                return;
            }

            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Đăng nhập không thành công" });
        } catch (error) {
            next(error)
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Chưa đăng nhập" });
                return;
            }

            let decode;
            try {
                decode = verifyRefreshToken(refreshToken);
            } catch (error) {
                res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
            }

            if (decode?.userId) {
                const newAccessToken = generateAccessToken(decode.userId);
                res.status(HTTP_STATUS.OK).json({ token: newAccessToken });
            }

        } catch (error) {
            next(error);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                res.status(204).json({ message: "Token không tồn tại" });
            }

            res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

            res.status(HTTP_STATUS.OK).json({ message: "Đăng xuất thành công" });
        } catch (error) {
            next(error)
        }
    },
    verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, email } = req.query as { email: string, id: string };

            const verifyId = await getVerifyEmail(email);
            if (verifyId === id) {

                await User.findOneAndUpdate({ email }, { isVerified: true });

                res.status(HTTP_STATUS.OK).json({ message: "Xác nhân email thành công, Bạn có thể đăng nhập" })
                deleteVerifyEmail(email);
                return;
            }

            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Mã xác nhận hết hạn hoặc không đúng" })

        } catch (error) {
            next(error)
        }
    }
}

export default authController;




