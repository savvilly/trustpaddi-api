import { siginUser } from '../services/auth/signin';
import { signupUser } from '../services/auth/signup';
import { userValidation } from "../middleware/validation/index";
import { requestResetPasswordValidation, resetPasswordValidation } from "../middleware/validation/auth";
import { sendPasswordResetCode, resetPassword } from '../services/auth/reset-password';

import { Router } from 'express';
const authRouter = Router()

authRouter.post('/signin_user', siginUser)
authRouter.post('/signup_user', userValidation, signupUser)
authRouter.post('/request_reset_password', requestResetPasswordValidation, sendPasswordResetCode)
authRouter.post('/reset_password', resetPasswordValidation, resetPassword)

export default authRouter