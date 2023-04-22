import mongoose from 'mongoose';
import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { NOT_CREATED, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { UserProps } from '../../types/user';
import AxiosInstance from '../../utils/axiosCall'
import { generateCustomerCode } from '../../utils/user';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, referralCode, avatar, phone, country, state, address, lga, bankAccount, bankAccountName, bankName } =
      req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(NOT_CREATED).json({ status: NOT_CREATED, message: 'account already exist', success: false });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const customerCode = await generateCustomerCode(firstName);

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
        customerCode,
        walletPin: null
      };

      User.create(newUser);
      return res.status(CREATED).json({ status: CREATED, message: 'Account created', success: true });
    }
  } catch (error) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
  }
};
