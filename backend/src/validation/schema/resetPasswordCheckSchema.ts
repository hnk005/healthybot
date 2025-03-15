import { passwordValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const resetPasswordCheckSchema: Schema = {
  newPassword: {
    ...passwordValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default resetPasswordCheckSchema;
