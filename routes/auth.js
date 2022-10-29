import checkAuth from '../middleware/checkAuth'
import { siginUser } from '../services/auth/signin';

import { Router } from 'express';
const authRouter = Router()

authRouter.post('/signin_user', siginUser)

export default authRouter