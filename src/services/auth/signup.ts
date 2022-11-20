import mongoose from 'mongoose';
import { Request, Response  } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import Wallet from '../../models/Wallet';
import { NOT_CREATED, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { UserProps } from '../../types';


export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, referral_code,  avatar, phone, country, state, address, lga } =
      req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: 'account already exist', success: false });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser: UserProps = {
        _id: new mongoose.Types.ObjectId(),
        firstname,
        lastname,
        email,
        phone,
        referral_code,
        password: hashPassword,
        address,
        avatar,
        country,
        state,
        lga,
        customer_code: `${lastname}-${crypto
          .randomBytes(Math.ceil(5 / 2))
          .toString('hex')
          .slice(0, 5)
          .toUpperCase()}`,
      };
      const wallet = new Wallet({
        sellerId: newUser._id,
        totalAmount: 0,
        withdrawalAmount: 0,
        trustAmount: 0,
      });
      User.create(newUser);
      wallet.save();
      return res.status(CREATED).json({ status: CREATED, message: 'success', success: true });
    }
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};
