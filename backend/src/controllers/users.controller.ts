import { HTTP_STATUS } from '@/contants/httpStatus';
import User from '@/models/database/User';
import { Request, Response } from 'express';
const usersController = {
  getAllUser: async (req: Request, res: Response) => {
    const allUser = await User.find();
    res.status(HTTP_STATUS.OK).json({ data: allUser });
  },
};

export default usersController;
