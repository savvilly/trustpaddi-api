import checkAuth from '../middleware/checkAuth'
import { validateUpdateWalletPinPayload } from '../middleware/validation/wallet';
import { updateProfile, getAllUsers, setUserActiveStatus, subDeleteUserAccount, updateWalletPin } from '../services/user/user';
import { Router } from 'express';
const userRouter = Router()

userRouter.put('/update_user', checkAuth, updateProfile);
userRouter.get('/get_all_users', checkAuth, getAllUsers);
userRouter.put('/set_user_active_status', checkAuth, setUserActiveStatus);
userRouter.put('/delete_user_account', checkAuth,  subDeleteUserAccount);
userRouter.put('/update_wallet_pin', checkAuth, validateUpdateWalletPinPayload, updateWalletPin);

export default userRouter