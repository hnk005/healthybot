import { redisClient } from "..";

const databaseService = {
  getOTPEmail: async (name: string, email: string) => {
    return await redisClient.get(`${name}:${email}`);
  },

  saveOTPEmail: async (
    name: string,
    email: string,
    otp: string,
    EX: number,
  ) => {
    await redisClient.set(`${name}:${email}`, otp, { EX });
  },

  deleteOTPEmail: async (name: string, email: string) => {
    await redisClient.del(`${name}:${email}`);
  },
};

export default databaseService;
