import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import jwtUtils from "@/utils/jwt.util";
const { generateAccessToken, verifyRefreshToken } = jwtUtils;

const authService = {
  createNewAccessToken: async (refreshToken: string) => {
    const decode = verifyRefreshToken(refreshToken);

    if (!decode.userId) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Token không hợp lệ hoặc đã hết hạn",
      );
    }

    return generateAccessToken(decode.userId);
  },
};

export default authService;
