import { NextFunction, Request, Response } from "express";
import { UserRole} from "~/contants/enum";
import User, { UserSchema } from "~/models/database/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS } from "~/contants/httpStatus";

dotenv.config();

// Đăng ký người dùng
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;

        // Kiểm tra role hợp lệ
        if (role && !Object.values(UserRole).includes(role)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Vai trò không hợp lệ" });
        }

        // Kiểm tra email đã tồn tại
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email đã tồn tại" });
        }

        // Tạo user mới
        const user = new User({ name, email, password, role });
        await user.save();

        
        return res.status(HTTP_STATUS.CREATED).json({ message: "Đăng ký thành công!" });
        
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server" });
    }
   
};

// Đăng nhập
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Email không tồn tại" });
        }

        // Kiểm tra mật khẩu
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Mật khẩu không chính xác" });
        }

        // Tạo token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        return res.json({ token, role: user.role });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};


