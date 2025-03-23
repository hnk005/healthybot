import express from "express";
import asyncMiddleware from "@/middlewares/async.middleware";

const sendRoutes = express.Router();

const { sendOTPVerifyEmail, sendOTPForgotPassword } = asyncMiddleware;

//public
sendRoutes.post("/verify-email", sendOTPVerifyEmail);
sendRoutes.post("/forgot-password", sendOTPForgotPassword);

export default sendRoutes;
