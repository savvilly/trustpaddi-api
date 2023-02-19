import mongoose from 'mongoose';
import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { NOT_CREATED, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { UserProps } from '../../types/user';
import { CreateWalletProps } from '../../types/wallet';
import { createUserWallet } from '../user/wallet';
import AxiosInstance from '../../utils/axiosCall'

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, referralCode, avatar, phone, country, state, address, lga, bankAccount, bankAccountName, bankName } =
      req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: 'account already exist', success: false });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser: UserProps = {
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        phone,
        referralCode: null ||  referralCode,
        password: hashPassword,
        address: null,
        avatar: null,
        country: null,
        state: null,
        lga: null,
        bankAccount: null, bankAccountName: null, bankName: null,
        customerCode: `${lastName}-${crypto
          .randomBytes(Math.ceil(5 / 2))
          .toString('hex')
          .slice(0, 5)
          .toUpperCase()}`,
      };

      User.create(newUser);
      const wallet: CreateWalletProps = {
        userId: newUser._id,
        totalAmount: 0,
        withdrawalAmount: 0,
        trustAmount: 0,
      };

      createUserWallet(wallet)
      return res.status(CREATED).json({ status: CREATED, message: 'Account created', success: true });
    }
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};
