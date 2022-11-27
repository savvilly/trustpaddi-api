import checkAuth from '../middleware/checkAuth'
import { updateProfile, getAllUsers, setUserActiveStatus, subDeleteUserAccount } from '../services/user/user';

import { Router } from 'express';
const userRouter = Router()

userRouter.put('/update_user', checkAuth, updateProfile);
userRouter.get('/get_all_users', checkAuth, getAllUsers);
userRouter.put('/set_user_active_status', checkAuth, setUserActiveStatus);
userRouter.put('/delete_user_account', checkAuth,  subDeleteUserAccount);

export default userRouter