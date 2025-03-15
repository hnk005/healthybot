import { emailValidate } from "@/config/validateConfig";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { User } from "@/models";
import { APIError } from "@/utils/error";
import { Schema } from "express-validator";

const forgotPasswordCheckSchema: Schema = {
  email: {
    ...emailValidate,
    custom: {
      options: async (email: string) => {
        const user = await User.findOne({ email, isVerified: true });

        if (!user) {
          throw new APIError(
            "BAD_REQUEST",
            HTTP_STATUS_CODE.BAD_REQUEST,
            "Email không tồn tại hoặc chưa được xác nhận",
          );
        }
      },
    },
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default forgotPasswordCheckSchema;
