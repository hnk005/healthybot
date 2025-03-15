import { emailValidate, passwordValidate } from "@/config/validateConfig";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { User } from "@/models";
import { APIError } from "@/utils/error";
import { Schema } from "express-validator";

const registerCheckSchema: Schema = {
  email: {
    ...emailValidate,
    custom: {
      options: async (email: string) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new APIError(
            "BAD_REQUEST",
            HTTP_STATUS_CODE.BAD_REQUEST,
            "Email đã tồn tại",
          );
        }
      },
    },
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
