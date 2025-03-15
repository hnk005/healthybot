import express from "express";
import authController from "@/controllers/auth.controller";
import asyncMiddleware from "@/middlewares/async.middleware";
import authMiddleware from "@/middlewares/auth.middleware";
import { checkSchema } from "express-validator";
import registerCheckSchema from "@/validation/schema/registerCheckSchema";
import loginCheckSchema from "@/validation/schema/loginCheckSchema";
import refreshCheckSchema from "@/validation/schema/refreshSchema";
import forgotPasswordCheckSchema from "@/validation/schema/forgotPasswordCheckSchema";

const authRouter = express.Router();

const { register, login, refresh, logout, forgotPassword } = authController;
const { verifyToken } = authMiddleware;
const { sendOTPVerifyEmail, sendOTPForgotPassword } = asyncMiddleware;

//public
authRouter.post(
  "/register",
  checkSchema(registerCheckSchema),
  register,
  sendOTPVerifyEmail,
);
authRouter.post("/login", checkSchema(loginCheckSchema), login);
authRouter.post(
  "/forgot-password",
  checkSchema(forgotPasswordCheckSchema),
  forgotPassword,
  sendOTPForgotPassword,
);

//private
authRouter.post(
  "/refresh-token",
  verifyToken,
  checkSchema(refreshCheckSchema),
  refresh,
);
authRouter.delete("/logout", verifyToken, logout);

export default authRouter;
