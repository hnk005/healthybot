import { HTTP_STATUS_CODE } from "@/contants/enum";
import { APIError } from "@/utils/error";
import jwtUtils from "@/utils/jwt.util";
const { generateToken, verifyToken } = jwtUtils;

const authService = {
  createNewAccessToken: async (refreshToken: string) => {
    const decode = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decode) {
      throw new APIError(
        "UNAUTHORIZED",
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Token không hợp lệ hoặc đã hết hạn",
      );
    }

    return generateToken(
      decode.userId,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.EXISTS_ACCESS_TOKEN,
    );
  },
};

export default authService;
