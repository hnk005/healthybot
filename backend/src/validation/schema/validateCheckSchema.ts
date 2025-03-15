import { emailValidate, otpValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const validateCheckSchema: Schema = {
  email: {
    ...emailValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
  otp: {
    ...otpValidate,
  },
};

export default validateCheckSchema;
