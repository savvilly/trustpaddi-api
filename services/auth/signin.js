import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { UNAUTHORIZED, SUCCESS, NOT_FOUND } from '../../utils/statusCode';

export const siginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'incorrect password or emaill', success: false });
    } else {
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'incorrect password or emaill', success: false });
      } else {
        const token = jwt.sign({ email, userId: user._id }, process.env.SESSION_SECRET, { expiresIn: '7d' });
        return res.status(SUCCESS).json({ status: SUCCESS, message: 'success', success: false, playload: { userInfo: user, token: token } });
      }
    }
  } catch (error) {
    return res.status(SERVER_RROR).json({ status: SERVER_ERROR, message: error, success: false })
  }
}
