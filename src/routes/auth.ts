import { siginUser } from '../services/auth/signin';
import { signupUser } from '../services/auth/signup';

import { Router } from 'express';
const authRouter = Router()

authRouter.post('/signin_user', siginUser)
authRouter.post('/signup_user', signupUser)

export default authRouter