import express from 'express';
import authController from '@/controllers/auth.controller';
import verifyMiddleware from '@/middlewares/verify.middleware';

const authRouter = express.Router();

const { register, login, refresh, logout, verifyEmail } = authController;
const { verifyUser } = verifyMiddleware;

authRouter.post('/register', register, verifyUser);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.delete('/logout', logout);
authRouter.get('/verify', verifyEmail);

export default authRouter;
