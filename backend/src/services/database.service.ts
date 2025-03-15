import { redis } from "@/config/connectDB";

const databaseService = {
  getRedis: async (key: string) => {
    return await redis.get(key);
  },

  saveRedis: async (key: string, value: string, EX: number) => {
    await redis.set(key, value, { EX });
  },

  deleteRedis: async (key: string) => {
    await redis.del(key);
  },
};

export default databaseService;
