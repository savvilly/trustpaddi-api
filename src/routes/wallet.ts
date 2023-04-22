import checkAuth from '../middleware/checkAuth';
import { getUserWalletBalance, getWalletTransactionsByFilters, transferFunds } from '../services/user/wallet';
import { validateTransferFundsPayload, validateGetWalletTransactionsPayload } from '../middleware/validation/wallet';

import { Router } from 'express';
const walletRouter = Router();

walletRouter.get('/balance', checkAuth, getUserWalletBalance);
walletRouter.get('/transactions', checkAuth, validateGetWalletTransactionsPayload, getWalletTransactionsByFilters);
walletRouter.post('/transfer', checkAuth, validateTransferFundsPayload, transferFunds);

export default walletRouter;
