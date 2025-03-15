import express from "express";
import asyncMiddleware from "@/middlewares/async.middleware";

const sendRoutes = express.Router();

const { sendOTPVerifyEmail, sendOTPForgotPassword } = asyncMiddleware;

//public
sendRoutes.post("/verify-email-otp", sendOTPVerifyEmail);
sendRoutes.post("/forgot-password-otp", sendOTPForgotPassword);

export default sendRoutes;
