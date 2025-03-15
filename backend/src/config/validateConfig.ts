import { ParamSchema } from "express-validator";

export const emailValidate: ParamSchema = {
  in: "body",
  isEmail: {
    errorMessage: "Email không hợp lệ",
  },
};

export const passwordValidate: ParamSchema = {
  in: "body",
  isLength: {
    options: { min: 8, max: 64 },
    errorMessage: "Mật khẩu nên có ít nhất 8 kí tự và tối đa là 64 từ",
  },
  matches: {
    options: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    errorMessage:
      "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt",
  },
};

export const refreshTokenValidate: ParamSchema = {
  in: "cookies",
  notEmpty: {
    errorMessage: "Chưa đăng nhập",
  },
};

export const otpValidate: ParamSchema = {
  in: "body",
  notEmpty: {
    errorMessage: "Không được để trống",
  },
};
