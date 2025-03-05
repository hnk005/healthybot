import express from "express";
import authController from "@/controllers/auth.controller";
import asyncMiddleware from "@/middlewares/async.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const authRouter = express.Router();

const { register, login, refresh, logout, forgotPassword } = authController;
const { verifyToken } = authMiddleware;
const { sendOTP } = asyncMiddleware;

//public
authRouter.post("/register", register, sendOTP);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword, sendOTP);

//private
authRouter.post("/refresh-token", verifyToken, refresh);
authRouter.delete("/logout", verifyToken, logout);

export default authRouter;
