import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../utils/statusCode';

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'unauthorized', success: false });
  }
};
export default checkAuth;
