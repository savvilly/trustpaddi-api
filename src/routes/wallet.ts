import checkAuth from '../middleware/checkAuth';
import { getUserWalletBalance, getWalletTransactions } from '../services/user/wallet';

import { Router } from 'express';
const walletRouter = Router();

walletRouter.get('/balance', checkAuth, getUserWalletBalance);
walletRouter.get('/transactions', checkAuth, getWalletTransactions);

export default walletRouter;
