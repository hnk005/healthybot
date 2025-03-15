import { emailValidate } from "@/config/validateConfig";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { UserInterface } from "@/contants/interface";
import { User } from "@/models";
import { APIError } from "@/utils/error";
import { Schema } from "express-validator";

const loginCheckSchema: Schema = {
  email: {
    ...emailValidate,
    custom: {
      options: async (email: string, { req }) => {
        if (!email) return;

        const user = await User.findOne({ email });

        if (!user) {
          throw new APIError(
            "BAD_REQUEST",
            HTTP_STATUS_CODE.BAD_REQUEST,
            "Email không tồn tại",
          );
        }

        if (!user.isVerified) {
          throw new APIError(
            "UNAUTHORIZED",
            HTTP_STATUS_CODE.UNAUTHORIZED,
            "Tài khoản chưa được xác nhận",
          );
        }

        req.body.user = user;
      },
    },
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
  password: {
    in: ["body"],
    custom: {
      options: async (password: string, { req }) => {
        const { user } = req.body as { user: UserInterface };
        if (!user) {
          return;
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          throw new APIError(
            "BAD_REQUEST",
            HTTP_STATUS_CODE.BAD_REQUEST,
            "Mật khẩu không chính xác",
          );
        }
      },
    },
    notEmpty: {
      errorMessage: "Không được để trống",
    },
  },
};

export default loginCheckSchema;
