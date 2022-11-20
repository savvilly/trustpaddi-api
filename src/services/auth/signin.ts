import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../../models/User';
import { UNAUTHORIZED, SUCCESS, NOT_FOUND, SERVER_ERROR } from '../../utils/statusCode'



export const siginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'incorrect password or emaill', success: false });
    } else {
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res
          .status(UNAUTHORIZED)
          .json({ status: UNAUTHORIZED, message: 'incorrect password or emaill', success: false });
      } else {
        let session_secret_token: any = process.env.SESSION_SECRET
        const token = jwt.sign({ email, userId: user._id }, session_secret_token, {
          expiresIn: '7d',
        });
        return res.status(SUCCESS).json({
          status: SUCCESS,
          message: 'success',
          success: true,
          playload: { userInfo: user, token: token },
        });
      }
    }
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};
