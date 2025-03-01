import usersController from '@/controllers/users.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

const userRouter = Router();

const { verifyToken } = authMiddleware;
const { getAllUser } = usersController;

userRouter.get('/getAllUser', verifyToken, getAllUser);

export default userRouter;
