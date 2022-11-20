import { Router } from 'express';
import userRouter from './user';
import authRouter from './auth';
import walletRouter from './wallet';
const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/wallet', walletRouter);

export default router;
