import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { templateVerifyEmail } from "@/template/verifyEmail.template";
import databaseService from "./database.service";

dotenv.config();

const { saveVerifyEmail } = databaseService;

const verify = {
    transporterEmail: nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    }),
    sendVerificationEmail: async (email: string, id: string) => {
        const link = `http://localhost:4000/api/auth/verify?email=${email}&id=${id}`;

        try {
            saveVerifyEmail(email, id);
            await verify.transporterEmail.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Xác nhận đăng ký tài khoản",
                html: templateVerifyEmail(link),
            });
            console.log(`email xác thực đã gửi tới ${email}`);
        } catch (error) {
            console.error(`Lỗi gửi email xác thực tới ${email}:`, error);
            throw new Error("Lỗi gửi email");
        }
    },
}

export default verify;