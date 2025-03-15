import express from "express";
import validateController from "@/controllers/validate.controller";
import { checkSchema } from "express-validator";
import validateCheckSchema from "@/validation/schema/validateCheckSchema";

const validateRoutes = express.Router();

const { validateVerifyEmail, validateForgotPassword } = validateController;

//public
validateRoutes.post(
  "/verify-email",
  checkSchema(validateCheckSchema),
  validateVerifyEmail,
);
validateRoutes.post(
  "/forgot-password",
  checkSchema(validateCheckSchema),
  validateForgotPassword,
);

export default validateRoutes;
