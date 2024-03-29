import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../utils/statusCode';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'unauthorized', success: false });
  }
};
export default checkAuth;
