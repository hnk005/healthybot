import { emailValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const forgotPasswordCheckSchema: Schema = {
  email: {
    ...emailValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default forgotPasswordCheckSchema;
