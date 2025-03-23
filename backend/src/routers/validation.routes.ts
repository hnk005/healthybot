import express from "express";
import validationController from "@/controllers/validation.controller";
import { checkSchema } from "express-validator";
import validateCheckSchema from "@/validation/schema/validateCheckSchema";

const validationRoutes = express.Router();

const { verifyEmail, forgotPassword } = validationController;

//public
validationRoutes.post(
  "/verify-email",
  checkSchema(validateCheckSchema),
  verifyEmail,
);
validationRoutes.post(
  "/forgot-password",
  checkSchema(validateCheckSchema),
  forgotPassword,
);

export default validationRoutes;
