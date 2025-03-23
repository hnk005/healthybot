import { APIError } from "@/utils/error";
import databaseService from "./database.service";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { User } from "@/models";

const { getRedis, deleteRedis } = databaseService;

const validateService = {
  compareEmailAndPassword: async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Email không tồn tại",
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Mật khẩu không chính sác",
      );
    }

    if (!user.isVerified) {
      return "";
    }

    return user.id;
  },
  compareOtp: async (task: string, email: string, otp: string) => {
    const key = `${task}:${email}`;

    const storedOTP = await getRedis(key);
    const user = await User.findOne({ email });

    if (!user) {
      throw new APIError(
        "UNAUTHORIZED",
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Email xác thực không tồn tại",
      );
    }

    if (storedOTP !== otp) {
      throw new APIError(
        "UNAUTHORIZED",
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "OTP xác nhận hết hạn hoặc không đúng",
      );
    }

    await deleteRedis(key);

    return {
      user,
      task,
    };
  },
};

export default validateService;
