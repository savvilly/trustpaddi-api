import checkAuth from '../middleware/checkAuth';
import { getUserWalletBallance } from '../services/user/wallet';

import { Router } from 'express';
import User from '../models/User';
const walletRouter = Router();

walletRouter.get('/get_wallet_sellerId/userId', checkAuth, getUserWalletBallance);

export default walletRouter;
