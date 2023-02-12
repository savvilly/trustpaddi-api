import checkAuth from '../middleware/checkAuth';
import { getUserWalletBallance, updateUserWalletBallance } from '../services/user/wallet';

import { Router } from 'express';
import User from '../models/User';
const walletRouter = Router();

walletRouter.get('/get_wallet_sellerId/userId', checkAuth, getUserWalletBallance);
walletRouter.put('/up_wallet_by_sellerId/:sellerId', checkAuth, updateUserWalletBallance);

export default walletRouter;
