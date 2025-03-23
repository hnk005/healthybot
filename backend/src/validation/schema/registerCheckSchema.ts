import { emailValidate, passwordValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const registerCheckSchema: Schema = {
  email: {
    ...emailValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
  password: {
    ...passwordValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default registerCheckSchema;
