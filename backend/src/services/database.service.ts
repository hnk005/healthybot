import { redisClient } from '..';

const databaseService = {
  getVerifyEmail: async (email: string) => {
    return await redisClient.get(`verifyEmail:${email}`);
  },

  saveVerifyEmail: async (email: string, id: string) => {
    await redisClient.set(`verifyEmail:${email}`, id, {
      EX: 5 * 60,
    });
  },

  deleteVerifyEmail: async (email: string) => {
    await redisClient.del(`verifyEmail:${email}`);
  },
};

export default databaseService;
