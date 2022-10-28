import checkAuth from '../middleware/checkAuth'
import { getUserWalletBalance } from '../services/user/wallet';

import { Router } from 'express';
const userRouter = Router()

userRouter.get('/get_wallet/:sellerId', checkAuth, getUserWalletBalance)

export default userRouter