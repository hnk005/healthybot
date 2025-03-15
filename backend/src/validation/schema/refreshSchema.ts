import { refreshTokenValidate } from "@/config/validateConfig";
import { Schema } from "express-validator";

const refreshCheckSchema: Schema = {
  refreshToken: {
    ...refreshTokenValidate,
  },
};

export default refreshCheckSchema;
