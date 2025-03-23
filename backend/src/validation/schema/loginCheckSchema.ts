import { emailValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const loginCheckSchema: Schema = {
  email: {
    ...emailValidate,
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default loginCheckSchema;
