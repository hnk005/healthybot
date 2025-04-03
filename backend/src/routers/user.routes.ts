import userController from "@/controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import resetPasswordCheckSchema from "@/validation/schema/resetPasswordCheckSchema";
import { Router } from "express";
import { checkSchema } from "express-validator";

const userRoutes = Router();

const { isUser, updateVerify, resetPassword } = userController;
const { verifyToken } = authMiddleware;

userRoutes.get("/info", verifyToken, isUser);
userRoutes.put("/update/verify", updateVerify);
userRoutes.put(
  "/update/password",
  checkSchema(resetPasswordCheckSchema),
  resetPassword,
);
// userRoutes.put("/update/change-password", resetPassword);

export default userRoutes;
