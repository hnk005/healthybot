import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
