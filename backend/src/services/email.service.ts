import nodemailer from "nodemailer";
import dotenv from "dotenv";
import otpUtil from "@/utils/otp";

dotenv.config();

const { generateOTP } = otpUtil;

const emailService = {
  transporterEmail: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }),
  sendOTP: async (email: string) => {
    const otp = generateOTP(6);

    await emailService.transporterEmail.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mã OTP xác thực tài khoản",
      text: `Mã OTP của bạn là: ${otp}.`,
    });

    return otp;
  },
};

export default emailService;
