import { APIError } from "@/utils/error";
import databaseService from "./database.service";
import { HTTP_STATUS_CODE } from "@/contants/enum";
import { User } from "@/models";

const { getRedis, deleteRedis } = databaseService;

const validateService = {
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
