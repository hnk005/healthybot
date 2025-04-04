import { HTTP_STATUS_CODE, TASK } from "@/contants/enum";
import databaseService from "./database.service";
import { APIError } from "@/utils/error";
import { User } from "@/models";

const { getRedis } = databaseService;

const userService = {
  existsEmail: async (email: string) => {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Email không tồn tại hoặc chưa được xác nhận",
      );
    }
  },
  sameEmail: async (email: string) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Email đã tồn tại",
      );
    }
  },
  createUser: async (email: string, password: string) => {
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
  },
  compareUserId: async (userId: string) => {
    const storedUserId = await getRedis(TASK.verifyEmail);

    if (!storedUserId || !userId || storedUserId !== userId) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Yêu cầu không hợp lệ",
      );
    }

    await User.findOneAndUpdate({ _id: userId }, { isVerified: true });
  },
  changePassword: async (userId: string, newPassword: string) => {
    const storedUserId = await getRedis(TASK.forgotPassword);

    if (!storedUserId || !userId || storedUserId !== userId) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Yêu cầu không hợp lệ",
      );
    }

    await User.findOneAndUpdate({ _id: userId }, { password: newPassword });
  },
};

export default userService;
