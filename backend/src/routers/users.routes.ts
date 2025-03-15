import usersController from "@/controllers/users.controller";
import resetPasswordCheckSchema from "@/validation/schema/resetPasswordCheckSchema";
import { Router } from "express";
import { checkSchema } from "express-validator";

const userRoutes = Router();

const { updateEmailVerify, resetPassword } = usersController;

userRoutes.put("/update/email-verify", updateEmailVerify);
userRoutes.put(
  "/update/reset-password",
  checkSchema(resetPasswordCheckSchema),
  resetPassword,
);
// userRoutes.put("/update/change-password", resetPassword);

export default userRoutes;
