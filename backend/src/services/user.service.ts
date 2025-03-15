import { HTTP_STATUS_CODE, TASK } from "@/contants/enum";
import databaseService from "./database.service";
import { APIError } from "@/utils/error";
import { User } from "@/models";

const { getRedis } = databaseService;

const userService = {
  createUser: async (email: string, password: string) => {
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
  },
  compareUserId: async (userId: string) => {
    const storedUserId = await getRedis(TASK.verifyEmail);

    if (!storedUserId || JSON.parse(storedUserId) !== userId) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Yêu cầu không hợp lệ",
      );
    }

    await User.findOneAndUpdate({ _id: userId }, { isVerified: true });
  },
  changePassword: async (userId: string, newPassword: string) => {
    const storedUserId = await getRedis(TASK.verifyEmail);

    if (!storedUserId || JSON.parse(storedUserId) !== userId) {
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
